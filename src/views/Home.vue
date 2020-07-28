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
        <div
          v-for="week in weekCount"
          :key="week"
          :class="week < (weekCount - 2) ? 'hide-sm hide-md' : ''"
          class="column text-right"
        >
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
          <span :title="address">{{ address | shorten }}</span>
        </div>
        <div
          v-for="week in weekCount"
          :key="week"
          :class="week < (weekCount - 2) ? 'hide-sm hide-md' : ''"
          class="column text-right d-flex flex-column"
        >
          <span :title="amounts[week].toFixed(3)" v-if="amounts[week]">
            {{ numeral(amounts[week]) }}
          </span>
          <span v-if="amounts[week]" class="text-gray">
            {{ numeral(100 / 14e4 * amounts[week]) }}%
          </span>
        </div>
        <div class="column text-right">
          <span :title="amounts.total.toFixed(3)">{{ numeral(amounts.total) }}</span>
          <div v-if="amounts.total" class="text-gray">
          {{ numeral(100 / (14e4 * weekCount) * amounts.total) }}%
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
import numeral from 'numeral';
import reports from '@/../reports';

const userReports = reports['0xeF8305E140ac520225DAf050e2f71d5fBcC543e7'.toLowerCase()];
const weekCount = Object.keys(userReports).length - 1;

export default {
  data() {
    return {
      q: '',
      weekCount,
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
  methods: {
    numeral(num) {
      return numeral(num).format('(0.[000]a)');
    },
  },
};
</script>
