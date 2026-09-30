<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#17120E] border border-[#2D2118]">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
          <ShieldCheck class="w-6 h-6" />
        </div>
        <div>
          <h1 class="font-serif text-2xl font-bold text-stone-100">
            Atelier Management Console
          </h1>
          <p class="text-xs text-stone-400">
            Manage product variations, WhatsApp concierge ({{ config?.channels?.whatsapp?.number || '07051377659' }}), and backend API ({{ config?.backendApi?.webhookUrl || 'https://nodus.com/api/webhooks' }}).
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-700/50 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI Orchestrator Connected
        </span>
      </div>
    </div>

    <!-- Notification Feedback -->
    <div
      v-if="feedback"
      class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2"
    >
      <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{{ feedback }}</span>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex items-center gap-2 border-b border-[#291F18] overflow-x-auto pb-2 text-xs font-semibold">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap',
          activeTab === tab.id
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
            : 'text-stone-400 hover:text-stone-200 hover:bg-[#1E1713]'
        ]"
      >
        <component :is="tab.icon" class="w-4 h-4 text-amber-500" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- TAB 1: ORDERS & LEADS -->
    <div v-if="activeTab === 'orders'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-serif text-xl font-bold text-stone-100">
          Captured Customer Orders & Channel Requests ({{ orders.length }})
        </h2>
        <button
          @click="exportOrdersJson"
          class="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-[#1C1612] border border-[#2B211A] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Download class="w-3.5 h-3.5 text-amber-500" />
          <span>Export JSON</span>
        </button>
      </div>

      <div v-if="orders.length === 0" class="p-12 text-center rounded-2xl bg-[#17120E] border border-[#281F18] space-y-3">
        <Database class="w-10 h-10 mx-auto text-stone-600" />
        <p class="font-serif text-lg text-stone-300">No orders logged yet</p>
        <p class="text-xs text-stone-500 max-w-sm mx-auto">
          When customers check out on WhatsApp or via the Website Order button, records and session references are cataloged here.
        </p>
      </div>

      <div v-else class="overflow-x-auto rounded-2xl border border-[#2B2018] bg-[#16110E]">
        <table class="w-full text-left text-xs text-stone-300">
          <thead class="bg-[#1F1713] text-stone-400 uppercase font-mono text-[10px] tracking-wider border-b border-[#2C211A]">
            <tr>
              <th class="py-3 px-4">Order # / Ref</th>
              <th class="py-3 px-4">Customer</th>
              <th class="py-3 px-4">Items & Variations</th>
              <th class="py-3 px-4">Zone / Address</th>
              <th class="py-3 px-4">Subtotal</th>
              <th class="py-3 px-4">Channel</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#241A14]">
            <tr v-for="ord in orders" :key="ord.id" class="hover:bg-[#1C1510] transition-colors">
              <td class="py-3 px-4 font-mono font-semibold text-amber-400">
                {{ ord.orderNumber }}
                <div class="text-[10px] text-stone-500 font-sans">
                  Ref: {{ ord.sessionRef }}
                </div>
              </td>

              <td class="py-3 px-4">
                <div class="font-semibold text-stone-200">{{ ord.customer.customerName }}</div>
                <div class="font-mono text-stone-400 text-[11px]">{{ ord.customer.phone }}</div>
              </td>

              <td class="py-3 px-4">
                <div v-if="ord.items.length === 0" class="text-stone-500 italic">Atelier Inquiry</div>
                <div v-else class="space-y-1">
                  <div v-for="(it, i) in ord.items" :key="i" class="text-[11px]">
                    <span class="font-semibold text-stone-200">{{ it.product.name }}</span>
                    <span class="text-stone-500"> ({{ it.quantity }}x {{ it.variation.name }})</span>
                  </div>
                </div>
              </td>

              <td class="py-3 px-4 text-[11px] text-stone-400 max-w-[200px] truncate">
                <span class="text-amber-300 font-medium capitalize">{{ ord.customer.deliveryZone }}</span>
                <div>{{ ord.customer.address }}</div>
              </td>

              <td class="py-3 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                {{ formatPrice(ord.subtotalNgn, currency, true) }}
              </td>

              <td class="py-3 px-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border',
                    ord.channel === 'whatsapp'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                      : 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                  ]"
                >
                  {{ ord.channel === 'whatsapp' ? 'WhatsApp' : 'Website (API)' }}
                </span>
              </td>

              <td class="py-3 px-4">
                <select
                  v-model="ord.status"
                  class="bg-[#120E0C] border border-[#2B211A] text-xs rounded px-2 py-1 text-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="packed">Packed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="completed">Completed</option>
                </select>
              </td>

              <td class="py-3 px-4 text-right">
                <button
                  @click="openCustomerChat(ord)"
                  class="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-700/40 cursor-pointer"
                >
                  <MessageCircle class="w-3 h-3 fill-current" />
                  <span>Chat</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 2: PRODUCTS & VARIATION MANAGER -->
    <div v-else-if="activeTab === 'products'" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-serif text-xl font-bold text-stone-100">
            Pantry Catalog & Variation Manager
          </h2>
          <p class="text-xs text-stone-400">
            Edit baseline prices in Naira (which automatically converts to foreign currencies) and toggle in-stock status.
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <div
          v-for="prod in products"
          :key="prod.id"
          class="p-5 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-4"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#241A14] pb-3">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                {{ prod.categoryName }}
              </span>
              <h3 class="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                <span>{{ prod.name }}</span>
                <span
                  v-if="prod.advertisedFirst"
                  class="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded"
                >
                  Advertised First
                </span>
              </h3>
            </div>

            <router-link
              :to="prod.landingPageUrl"
              class="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400"
            >
              <span>View Landing Page</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </router-link>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-stone-300">
              <thead class="text-[10px] font-mono uppercase text-stone-500 border-b border-[#251B15]">
                <tr>
                  <th class="py-2">Variation Name / Pack</th>
                  <th class="py-2">SKU</th>
                  <th class="py-2">Price (NGN ₦)</th>
                  <th class="py-2">Active Currency Approx</th>
                  <th class="py-2">Stock Availability</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#201712]">
                <tr v-for="v in prod.variations" :key="v.id" class="hover:bg-[#1E1712]">
                  <td class="py-2.5 font-semibold text-stone-200">{{ v.name }}</td>
                  <td class="py-2.5 font-mono text-stone-400 text-[11px]">{{ v.sku }}</td>
                  <td class="py-2.5">
                    <div class="flex items-center gap-1.5">
                      <span class="text-stone-400 font-mono">₦</span>
                      <input
                        type="number"
                        :value="v.priceNgn"
                        @change="handlePriceInput(prod.id, v.id, $event)"
                        class="w-24 bg-[#120E0C] border border-[#2B211A] rounded px-2 py-1 text-xs text-amber-400 font-mono"
                      />
                    </div>
                  </td>
                  <td class="py-2.5 font-mono text-stone-400">
                    {{ formatPrice(v.priceNgn, currency, true) }}
                  </td>
                  <td class="py-2.5">
                    <button
                      @click="store.updateProductStock(prod.id, v.id)"
                      :class="[
                        'px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer border transition-colors',
                        v.inStock
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50'
                          : 'bg-red-950/60 text-red-400 border-red-700/50'
                      ]"
                    >
                      {{ v.inStock ? 'In Stock' : 'Out of Stock' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: API & MULTICHANNEL CONFIGURATION -->
    <div v-else-if="activeTab === 'integrations'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Settings Form -->
      <form @submit.prevent="saveSettings" class="p-6 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-5 text-xs">
        <h2 class="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
          <Settings class="w-5 h-5 text-amber-500" />
          <span>Multichannel & Webhook API Configuration</span>
        </h2>

        <!-- WhatsApp Phone -->
        <div class="space-y-1.5">
          <label class="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
            Target WhatsApp Phone Number
          </label>
          <div class="flex gap-2">
            <input
              type="text"
              v-model="editConfig.channels.whatsapp.countryCode"
              class="w-16 bg-[#130E0C] border border-[#2B211A] rounded-lg px-2.5 py-2 text-white font-mono text-center"
            />
            <input
              type="text"
              v-model="editConfig.channels.whatsapp.number"
              class="flex-1 bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white font-mono"
            />
          </div>
          <p class="text-[10px] text-stone-500">
            Customer clicks on "Order via WhatsApp" will route automatically to this number.
          </p>
        </div>

        <!-- Webhook Endpoint -->
        <div class="space-y-1.5">
          <label class="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
            Backend Webhook Endpoint Destination
          </label>
          <input
            type="url"
            v-model="editConfig.backendApi.webhookUrl"
            class="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-amber-300 font-mono text-xs"
          />
          <p class="text-[10px] text-stone-500">
            Standardized JSON payloads are dispatched via HTTP POST to this endpoint.
          </p>
        </div>

        <!-- Webhook Secret -->
        <div class="space-y-1.5">
          <label class="block text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
            Webhook Secret Token (Header: X-Pantry-Secret)
          </label>
          <input
            type="text"
            v-model="editConfig.backendApi.secretToken"
            class="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white font-mono text-xs"
          />
        </div>

        <!-- Secondary Channels -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label class="block text-stone-300 text-[11px]">Telegram Handle</label>
            <input
              type="text"
              v-model="editConfig.channels.telegram.handle"
              class="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white text-xs font-mono"
            />
          </div>
          <div>
            <label class="block text-stone-300 text-[11px]">Instagram Handle</label>
            <input
              type="text"
              v-model="editConfig.channels.instagram.handle"
              class="w-full bg-[#130E0C] border border-[#2B211A] rounded-lg px-3 py-2 text-white text-xs font-mono"
            />
          </div>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Save class="w-4 h-4" />
            <span>Save Configuration File & Settings</span>
          </button>
        </div>
      </form>

      <!-- Webhook Diagnostic Tester -->
      <div class="p-6 rounded-2xl bg-[#17120E] border border-[#2A2018] space-y-5 text-xs">
        <h2 class="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
          <Send class="w-5 h-5 text-amber-500" />
          <span>Real-Time Webhook API Diagnostic</span>
        </h2>
        <p class="text-stone-400 text-xs leading-relaxed">
          Verify that your backend orchestrator at <span class="font-mono text-amber-400">{{ editConfig.backendApi.webhookUrl }}</span> accepts incoming HTTP POST payloads.
        </p>

        <div class="p-4 rounded-xl bg-[#120E0C] border border-[#261B14] space-y-2 font-mono text-[11px] text-stone-300">
          <div class="text-stone-500">POST {{ editConfig.backendApi.webhookUrl }}</div>
          <div class="text-amber-500/80">Header: X-Pantry-Secret: {{ editConfig.backendApi.secretToken }}</div>
          <div class="text-stone-400">
            { "event": "webhook.ping", "timestamp": "...", "channel": "web_storefront" }
          </div>
        </div>

        <button
          type="button"
          @click="runPing"
          :disabled="isPinging"
          class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#241A14] hover:bg-[#30221A] border border-amber-600/40 text-amber-300 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw :class="['w-4 h-4', isPinging ? 'animate-spin' : '']" />
          <span>{{ isPinging ? 'Pinging Webhook Destination...' : 'Send Live Test Ping to Nodus Webhook' }}</span>
        </button>

        <div
          v-if="pingResult"
          :class="[
            'p-3.5 rounded-xl border text-xs flex items-start gap-2.5',
            pingResult.success
              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
              : 'bg-red-950/60 border-red-700 text-red-200'
          ]"
        >
          <CheckCircle2 v-if="pingResult.success" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <AlertCircle v-else class="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div class="font-bold">{{ pingResult.success ? 'Diagnostic Success' : 'Diagnostic Notice' }}</div>
            <div class="mt-0.5 leading-relaxed">{{ pingResult.message }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: WEBHOOK LOGS -->
    <div v-else-if="activeTab === 'webhook-logs'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-serif text-xl font-bold text-stone-100">
          Live Multichannel Webhook Dispatch Log
        </h2>
        <button
          @click="refreshLogs"
          class="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-[#1C1612] border border-[#2B211A] px-3 py-1.5 rounded-lg cursor-pointer"
        >
          <RefreshCw class="w-3.5 h-3.5 text-amber-500" />
          <span>Refresh</span>
        </button>
      </div>

      <div v-if="webhookLogs.length === 0" class="p-12 text-center rounded-2xl bg-[#17120E] border border-[#281F18] space-y-3">
        <Send class="w-10 h-10 mx-auto text-stone-600" />
        <p class="font-serif text-lg text-stone-300">No events logged yet</p>
        <p class="text-xs text-stone-500 max-w-sm mx-auto">
          Send a test ping or submit an order to inspect outbound transmission payloads.
        </p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="log in webhookLogs"
          :key="log.id"
          class="p-4 rounded-xl bg-[#16110E] border border-[#281F18] space-y-2 text-xs"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'w-2 h-2 rounded-full',
                  log.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
                ]"
              />
              <span class="font-mono font-bold text-amber-300 uppercase">{{ log.event }}</span>
              <span v-if="log.orderNumber" class="font-mono text-stone-400">#{{ log.orderNumber }}</span>
            </div>
            <span class="font-mono text-[10px] text-stone-500">{{ new Date(log.timestamp).toLocaleTimeString() }}</span>
          </div>

          <div class="text-[11px] text-stone-400 font-mono truncate">
            Endpoint: {{ log.endpoint }}
          </div>

          <div v-if="log.responseMessage" class="text-[11px] text-stone-300">
            Response: <span class="font-semibold">{{ log.responseMessage }}</span>
          </div>

          <details class="mt-2 text-[11px]">
            <summary class="text-amber-500 cursor-pointer hover:underline font-mono">
              Inspect Multichannel JSON Payload
            </summary>
            <pre class="mt-2 p-3 bg-[#110D0A] border border-[#241A13] rounded-lg font-mono text-[10px] text-stone-300 overflow-x-auto">{{ JSON.stringify(log.payload, null, 2) }}</pre>
          </details>
        </div>
      </div>
    </div>

    <!-- TAB 5: SHIPPING RANGES -->
    <div v-else-if="activeTab === 'shipping'" class="space-y-6">
      <h2 class="font-serif text-xl font-bold text-stone-100">
        Delivery Zones & Negotiable Shipping Ranges
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="zone in editConfig.shippingEstimates"
          :key="zone.id"
          class="p-5 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-widest text-amber-500">
              {{ zone.id }}
            </span>
            <span class="font-mono font-bold text-amber-400 text-sm">
              ₦{{ zone.minNgn.toLocaleString('en-NG') }} – ₦{{ zone.maxNgn.toLocaleString('en-NG') }}
            </span>
          </div>

          <h3 class="font-serif text-lg font-bold text-stone-100">{{ zone.name }}</h3>
          <p class="text-xs text-stone-400">{{ zone.coverage }}</p>
          <p class="text-[11px] text-stone-500 italic">{{ zone.note }}</p>

          <div class="pt-2 text-[11px] font-mono text-emerald-400">
            Est: {{ zone.deliveryDays }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { formatPrice } from '../utils/currency';
import { testWebhookPing, getWebhookLogs, WebhookLogEntry } from '../utils/webhook';
import { openWhatsAppChat } from '../utils/whatsapp';
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
} from 'lucide-vue-next';

const store = usePantryStore();
const { products, config, currency, orders } = store;

const activeTab = ref<'orders' | 'products' | 'integrations' | 'webhook-logs' | 'shipping'>('orders');

const tabs = [
  { id: 'orders', label: 'Live Orders & Leads', icon: Database },
  { id: 'products', label: 'Products & Variations', icon: Package },
  { id: 'integrations', label: 'API & Multichannel Config', icon: Settings },
  { id: 'webhook-logs', label: 'Webhook Event Logs', icon: Send },
  { id: 'shipping', label: 'Shipping Ranges', icon: Truck },
];

const editConfig = reactive(getPantryConfig());
const feedback = ref<string | null>(null);
const isPinging = ref(false);
const pingResult = ref<{ success: boolean; message: string } | null>(null);
const webhookLogs = ref<WebhookLogEntry[]>(getWebhookLogs());

function saveSettings() {
  store.updateConfig(JSON.parse(JSON.stringify(editConfig)));
  feedback.value = 'Configuration file and API settings saved successfully!';
  setTimeout(() => {
    feedback.value = null;
  }, 3500);
}

async function runPing() {
  isPinging.value = true;
  pingResult.value = null;
  try {
    const res = await testWebhookPing();
    pingResult.value = res;
    webhookLogs.value = getWebhookLogs();
  } catch (err: any) {
    pingResult.value = { success: false, message: err?.message || 'Ping failed' };
  } finally {
    isPinging.value = false;
  }
}

function refreshLogs() {
  webhookLogs.value = getWebhookLogs();
}

function handlePriceInput(productId: string, variationId: string, event: Event) {
  const input = event.target as HTMLInputElement;
  const newPrice = parseInt(input.value, 10);
  if (!isNaN(newPrice) && newPrice >= 0) {
    store.updateProductPrice(productId, variationId, newPrice);
  }
}

function openCustomerChat(ord: any) {
  const text = `Hello ${ord.customer.customerName}, this is Akinnike Ols Pantry regarding your order #${ord.orderNumber}.`;
  openWhatsAppChat(text);
}

function exportOrdersJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders.value, null, 2));
  const anchor = document.createElement('a');
  anchor.setAttribute('href', dataStr);
  anchor.setAttribute('download', `akinnike_orders_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
</script>
