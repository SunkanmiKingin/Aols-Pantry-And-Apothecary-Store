<template>
  <div class="min-h-screen flex flex-col bg-[#12100E] text-[#F3EFEA] font-sans selection:bg-amber-500/30 selection:text-amber-200">
    <!-- Top Global Bar -->
    <Navbar />

    <!-- Standard Extensible Content Slot -->
    <main class="flex-1">
      <slot>
        <router-view />
      </slot>
    </main>

    <!-- Global Footer -->
    <Footer />

    <!-- Overlays & Modals -->
    <CurrencyModal />
    <CartDrawer />
    <OrderReceiptModal />
    <WhatsAppFloatingButton />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CurrencyModal from '../components/CurrencyModal.vue';
import CartDrawer from '../components/CartDrawer.vue';
import OrderReceiptModal from '../components/OrderReceiptModal.vue';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton.vue';
</script>
