<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <!-- transactions refers to the one in data() below. :key is SH of v-bind:key, the name in v-bind needs to match the one in v-for -->
        <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>${{ transaction.amount }}</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['transactionDeleted']);

const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
};
</script>

<!-- <script>
    // option API
    export default {
        data() {
            return {
                transactions: [
                    { id: 1, text: 'Flower', amount: -19.99 },
                    { id: 2, text: 'Salary', amount: 299.97 },
                    { id: 3, text: 'Book', amount: -19 },
                    { id: 4, text: 'Camera', amount: 150 },
                ]
            }
        }
    }
</script> -->

<!-- <script setup>
    // composition API
    const transactions = [
        { id: 1, text: 'Flower', amount: -19.99 },
        { id: 2, text: 'Salary', amount: 299.97 },
        { id: 3, text: 'Book', amount: -19 },
        { id: 4, text: 'Camera', amount: 150 },
    ];
</script> -->