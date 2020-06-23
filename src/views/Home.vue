<template>
  <div class="text-white">
    <div class="px-3 pt-4 pb-3">
      <h2 class="mb-0">Balancer liquidity mining reports</h2>
    </div>
    <Sticky>
      <input
        v-model="q"
        class="border-0 width-full p-3"
        placeholder="Search by address"
      >
    </Sticky>
    <div>
      <div class="d-flex flex-items-center p-3">
        <div class="flex-auto">Address</div>
        <div v-for="week in weekCount" :key="week" class="column text-right">
          Week {{ week }}
        </div>
        <div class="column text-right">Total</div>
      </div>
      <div
        v-for="(amounts, address) in users"
        :key="address"
        class="d-flex flex-items-center p-3 border-top"
      >
        <div class="flex-auto">
          <span class="hide-sm hide-md hide-lg">{{ address }}</span>
          <span class="hide-xl">{{ address | shorten }}</span>
        </div>
        <div v-for="week in weekCount" :key="week" class="column text-right">
          <span v-if="amounts[week]">
            {{ amounts[week].toFixed(3) }}
          </span>
          <div v-if="amounts[week]" class="text-gray">
            {{ (100 / 14e4 * amounts[week]).toFixed(3) }}%
          </div>
        </div>
        <div class="column text-right">
          {{ amounts.total.toFixed(3) }}
          <div v-if="amounts.total" class="text-gray">
          {{ (100 / (14e4 * weekCount) * amounts.total).toFixed(3) }}%
          </div>
        </div>
      </div>
      <div v-if="Object.keys(users).length === 0" class="border-top px-3 py-4">
        No result for "{{ q }}"
      </div>
    </div>
  </div>
</template>

<script>
import reports from '@/reports';

export default {
  data() {
    return {
      q: '',
      weekCount: 3,
    };
  },
  computed: {
    users() {
      return Object.fromEntries(Object.entries(reports).filter((user) => {
        const userStr = user[0].toLowerCase();
        return userStr.includes(this.q.toLowerCase().trim());
      }).slice(0, 100));
    },
  },
};
</script>
