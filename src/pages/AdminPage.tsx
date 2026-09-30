import React, { useState } from 'react';
import { Product, IntegrationSettings, OrderRecord, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { testWebhookPing, getWebhookLogs, WebhookLogEntry } from '../utils/webhook';
import { 
  ShieldCheck, 
  Settings, 
  Package, 
  Send, 
  MessageCircle, 
  Database, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ExternalLink,
  Download
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  settings: IntegrationSettings;
  onUpdateSettings: (settings: IntegrationSettings) => void;
  orders: OrderRecord[];
  onUpdateOrders: (orders: OrderRecord[]) => void;
  currency: CurrencyCode;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onUpdateProducts,
  settings,
  onUpdateSettings,
  orders,
  onUpdateOrders,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'integrations' | 'webhook-logs' | 'shipping'>('orders');

  // Form states for settings
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [whatsappCountryCode, setWhatsappCountryCode] = useState(settings.whatsappCountryCode);
  const [webhookUrl, setWebhookUrl] = useState(settings.webhookUrl);
  const [webhookSecretToken, setWebhookSecretToken] = useState(settings.webhookSecretToken);
  const [enableAutoWebhookDispatch, setEnableAutoWebhookDispatch] = useState(settings.enableAutoWebhookDispatch);
  const [businessEmail, setBusinessEmail] = useState(settings.businessEmail);

  // Ping test state
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ success: boolean; message: string; statusCode?: number } | null>(null);

  // Notification feedback
  const [feedback, setFeedback] = useState<string | null>(null);

  // Refresh logs
  const [webhookLogs, setWebhookLogs] = useState<WebhookLogEntry[]>(() => getWebhookLogs());

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: IntegrationSettings = {
      ...settings,
      whatsappNumber,
      whatsappCountryCode,
      webhookUrl,
      webhookSecretToken,
      enableAutoWebhookDispatch,
      businessEmail,
      businessPhoneDisplay: `+${whatsappCountryCode} ${whatsappNumber.replace(/^0/, '')}`,
    };
    onUpdateSettings(updated);
    setFeedback('Integration & WhatsApp settings successfully updated!');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleTestPing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await testWebhookPing({
        ...settings,
        webhookUrl,
        webhookSecretToken,
      });
      setPingResult(res);
      setWebhookLogs(getWebhookLogs());
    } catch (err: any) {
      setPingResult({ success: false, message: err?.message || 'Ping failed' });
    } finally {
      setIsPinging(false);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderRecord['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    onUpdateOrders(updated);
  };

  const handleToggleProductStock = (productId: string, variationId: string) => {
    const updated = products.map((p) => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variations: p.variations.map((v) => (v.id === variationId ? { ...v, inStock: !v.inStock } : v)),
      };
    });
    onUpdateProducts(updated);
  };

  const handleUpdatePrice = (productId: string, variationId: string, newPriceNgn: number) => {
    if (isNaN(newPriceNgn) || newPriceNgn < 0) return;
    const updated = products.map((p) => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variations: p.variations.map((v) => (v.id === variationId ? { ...v, priceNgn: newPriceNgn } : v)),
      };
    });
    onUpdateProducts(updated);
  };

  const handleExportOrders = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `akinnike_orders_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#17120E] border border-[#2D2118]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-100">
              Atelier Management Console
            </h1>
            <p className="text-xs text-stone-400">
              Manage product variations, WhatsApp concierge (07051377659), and backend webhook API (nodus.com/api/webhooks).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-700/50 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Backend Connected
          </span>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-[#291F18] overflow-x-auto pb-2 text-xs font-semibold">
        {[
          { id: 'orders', label: `Live Orders & Leads (${orders.length})`, icon: Database },
          { id: 'products', label: `Products & Variations (${products.length})`, icon: Package },
          { id: 'integrations', label: 'API & WhatsApp Settings', icon: Settings },
          { id: 'webhook-logs', label: `Webhook Dispatch Log (${webhookLogs.length})`, icon: Send },
          { id: 'shipping', label: 'Shipping Zones & Logistics', icon: Truck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-[#1E1713]'
              }`}
            >
              <Icon className="w-4 h-4 text-amber-500" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORDERS & LEADS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-stone-100">
              Captured Customer Orders & WhatsApp Inquiries
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportOrders}
                className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-[#1C1612] border border-[#2B211A] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#17120E] border border-[#281F18] space-y-3">
              <Database className="w-10 h-10 mx-auto text-stone-600" />
              <p className="font-serif text-lg text-stone-300">No orders logged yet</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                When customers check out on WhatsApp or via the Webhook API button, orders are automatically catalogued here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#2B2018] bg-[#16110E]">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-[#1F1713] text-stone-400 uppercase font-mono text-[10px] tracking-wider border-b border-[#2C211A]">
                  <tr>
                    <th className="py-3 px-4">Order # / Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items & Pack</th>
                    <th className="py-3 px-4">Zone / Address</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#241A14]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#1C1510] transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-amber-400">
                        {ord.orderNumber}
                        <div className="text-[10px] text-stone-500 font-sans">
                          {new Date(ord.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-200">{ord.customer.customerName}</div>
                        <div className="font-mono text-stone-400 text-[11px]">{ord.customer.phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        {ord.items.length === 0 ? (
                          <span className="text-stone-500 italic">Atelier Consultation</span>
                        ) : (
                          <div className="space-y-1">
                            {ord.items.map((it, i) => (
                              <div key={i} className="text-[11px]">
                                <span className="font-semibold text-stone-200">{it.product.name}</span>
                                <span className="text-stone-500"> ({it.quantity}x {it.variation.name})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-[11px] text-stone-400 max-w-[200px] truncate">
                        <span className="text-amber-300 font-medium capitalize">{ord.customer.deliveryZone}</span>
                        <div>{ord.customer.address}</div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                        {formatPrice(ord.totalNgn, currency)}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
                          ord.channel === 'whatsapp'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                            : 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                        }`}>
                          {ord.channel === 'whatsapp' ? 'WhatsApp' : 'Webhook API'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#120E0C] border border-[#2B211A] text-xs rounded px-2 py-1 text-stone-200 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="packed">Packed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/234${ord.customer.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                            `Hello ${ord.customer.customerName}, this is Akinnike Ols Pantry regarding order #${ord.orderNumber}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-700/40"
                        >
                          <MessageCircle className="w-3 h-3 fill-current" />
                          <span>Chat</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS & VARIATIONS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-100">
                Pantry Catalog & Variation Manager
              </h2>
              <p className="text-xs text-stone-400">
                Adjust prices in Naira (converts dynamically for international clients) and toggle small-batch availability.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#241A14] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                      {prod.categoryName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                      <span>{prod.name}</span>
                      {prod.advertisedFirst && (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded">
                          Advertised First
                        </span>
                      )}
                    </h3>
                  </div>

                  <a
                    href={prod.landingPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400"
                  >
                    <span>View Landing Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Variations Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="text-[10px] font-mono uppercase text-stone-500 border-b border-[#251B15]">
                      <tr>
                        <th className="py-2">Variation Name / Pack</th>
                        <th className="py-2">SKU</th>
                        <th className="py-2">Price (NGN ₦)</th>
                        <th className="py-2">Active Currency Approx</th>
                        <th className="py-2">Stock Availability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#201712]">
                      {prod.variations.map((v) => (
                        <tr key={v.id} className="hover:bg-[#1E1712]">
                          <td className="py-2.5 font-semibold text-stone-200">{v.name}</td>
                          <td className="py-2.5 font-mono text-stone-400 text-[11px]">{v.sku}</td>
                          <td className="py-2.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-stone-400 font-mono">₦</span>
                              <input
                                type="number"
                                value={v.priceNgn}
                                onChange={(e) =>
                                  handleUpdatePrice(prod.id, v.id, parseInt(e.target.value, 10))
                                }
                                className="w-24 bg-[#120E0C] border border-[#2B211A] rounded px-2 py-1 text-xs text-amber-400 font-mono"
                              />
                            </div>
                          </td>
                          <td className="py-2.5 font-mono text-stone-400">
                            {formatPrice(v.priceNgn, currency)}
                          </td>
                          <td className="py-2.5">
                            <button
                              onClick={() => handleToggleProductStock(prod.id, v.id)}
                              className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer border transition-colors ${
                                v.inStock
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50'
                                  : 'bg-red-950/60 text-red-400 border-red-700/50'
                              }`}
                            >
                              {v.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTEGRATIONS & WHATSAPP CONFIG */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Form */}
          <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-5 text-xs">
            <h2 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-500" />
              <span>External API & WhatsApp Configuration</span>
            </h2>

            {/* WhatsApp Target Number */}
            <div className="space-y-1.5">
              <label className="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                Target WhatsApp Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={whatsappCountryCode}
                  onChange={(e) => setWhatsappCountryCode(e.target.value)}
                  placeholder="234"
                  className="w-16 bg-[#130E0C] border border-[#2B211A] rounded-lg px-2.5 py-2 text-white font-mono text-center"
                />
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="07051377659"
                  className="flex-1 bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <p className="text-[10px] text-stone-500">
                Customer clicks on "Order via WhatsApp" will route automatically to this international WhatsApp handle.
              </p>
            </div>

            {/* Webhook Endpoint */}
            <div className="space-y-1.5">
              <label className="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                Backend Webhook Endpoint Destination
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://nodus.com/api/webhooks"
                className="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-amber-300 font-mono text-xs"
              />
              <p className="text-[10px] text-stone-500">
                Full order JSON payloads are dispatched via HTTP POST to this REST endpoint upon order creation.
              </p>
            </div>

            {/* Webhook Secret */}
            <div className="space-y-1.5">
              <label className="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                Webhook Security Token (Header X-Pantry-Secret)
              </label>
              <input
                type="text"
                value={webhookSecretToken}
                onChange={(e) => setWebhookSecretToken(e.target.value)}
                placeholder="akinnike_pantry_live_key_9942"
                className="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white font-mono text-xs"
              />
            </div>

            {/* Auto Dispatch Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="autoWebhook"
                checked={enableAutoWebhookDispatch}
                onChange={(e) => setEnableAutoWebhookDispatch(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
              />
              <label htmlFor="autoWebhook" className="text-xs text-stone-300 cursor-pointer">
                Automatically fire Webhook API whenever a user clicks "Order via WhatsApp"
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                Business Contact Email
              </label>
              <input
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>

          {/* Webhook Connection Tester */}
          <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-5 text-xs">
            <h2 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-500" />
              <span>Real-Time Webhook API Diagnostic</span>
            </h2>
            <p className="text-stone-400 text-xs leading-relaxed">
              Verify that your backend at <span className="font-mono text-amber-400">{webhookUrl}</span> accepts inbound HTTP POST payloads from our storefront.
            </p>

            <div className="p-4 rounded-xl bg-[#120E0C] border border-[#261B14] space-y-2 font-mono text-[11px] text-stone-300">
              <div className="text-stone-500">POST {webhookUrl}</div>
              <div className="text-amber-500/80">Header: X-Pantry-Secret: {webhookSecretToken || '(none)'}</div>
              <div className="text-stone-400 leading-relaxed">
                {`{
  "event": "webhook.ping",
  "timestamp": "${new Date().toISOString().slice(0, 19)}Z",
  "source": "Akinnike Ols Pantry & Apothecary"
}`}
              </div>
            </div>

            <button
              type="button"
              onClick={handleTestPing}
              disabled={isPinging}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#241A14] hover:bg-[#30221A] border border-amber-600/40 text-amber-300 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Pinging Webhook Destination...' : 'Send Live Test Ping to Nodus Webhook'}</span>
            </button>

            {pingResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  pingResult.success
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                    : 'bg-red-950/60 border-red-700 text-red-200'
                }`}
              >
                {pingResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    {pingResult.success ? 'Diagnostic Success' : 'Diagnostic Notice'}
                  </div>
                  <div className="mt-0.5 leading-relaxed">{pingResult.message}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: WEBHOOK LOGS */}
      {activeTab === 'webhook-logs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-stone-100">
              Live Webhook Dispatch Audit Log
            </h2>
            <button
              onClick={() => setWebhookLogs(getWebhookLogs())}
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-[#1C1612] border border-[#2B211A] px-3 py-1.5 rounded-lg"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
              <span>Refresh Logs</span>
            </button>
          </div>

          {webhookLogs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#17120E] border border-[#281F18] space-y-3">
              <Send className="w-10 h-10 mx-auto text-stone-600" />
              <p className="font-serif text-lg text-stone-300">No webhook events logged yet</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Send a test ping from the API settings tab or submit a customer order to observe outbound transmission payloads.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {webhookLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-[#16110E] border border-[#281F18] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      <span className="font-mono font-bold text-amber-300 uppercase">{log.event}</span>
                      {log.orderNumber && (
                        <span className="font-mono text-stone-400">#{log.orderNumber}</span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-stone-500">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>

                  <div className="text-[11px] text-stone-400 font-mono truncate">
                    Endpoint: {log.endpoint}
                  </div>

                  {log.responseMessage && (
                    <div className="text-[11px] text-stone-300">
                      Response: <span className="font-semibold">{log.responseMessage}</span>
                    </div>
                  )}

                  <details className="mt-2 text-[11px]">
                    <summary className="text-amber-500 cursor-pointer hover:underline font-mono">
                      Inspect JSON Payload
                    </summary>
                    <pre className="mt-2 p-3 bg-[#110D0A] border border-[#241A13] rounded-lg font-mono text-[10px] text-stone-300 overflow-x-auto">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SHIPPING ZONES */}
      {activeTab === 'shipping' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-100">
            Delivery Zones & Freight Tariffs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settings.shippingZones.map((zone) => (
              <div
                key={zone.id}
                className="p-5 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                    {zone.id}
                  </span>
                  <span className="font-mono font-bold text-base text-amber-400">
                    {formatPrice(zone.feeNgn, currency)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100">{zone.name}</h3>
                <p className="text-xs text-stone-400">{zone.description}</p>
                <div className="pt-2 text-[11px] font-mono text-emerald-400">
                  Est: {zone.estimatedDays}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
