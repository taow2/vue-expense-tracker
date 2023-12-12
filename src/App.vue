<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />

    <!-- + in front of income & expenses makes them numbers instead of string  -->
    <IncomeExpenses :income="+income" :expenses="+expenses" />

    <!-- transactions here come from <script setup> -->
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />

    <!-- transactionSubmitted is a custom event in AddTransaction.vue -->
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<!-- <script>
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';

  export default {
    components: {
      Header,
      Balance,
      IncomeExpenses,
      TransactionList,
      AddTransaction
    }
  }
</script> -->

<script setup>
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';

  import { useToast } from 'vue-toastification';

  import { ref, computed, onMounted } from 'vue';

  const toast = useToast();

  const transactions = ref([

  ]);

  onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  
    // check if local storage has things for transactions already
    if(savedTransactions) {
      transactions.value = savedTransactions;
    }
  });

  // Get total
  const total = computed(() => {
    // acc stands for accumlator, it sums its content up starting from 0
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0 )
  });

  // Get income
  const income = computed(() => {
    // filter for positive val only, toFixed fixes to 2 decimal
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0 ).toFixed(2);
  });

  // Get expenses
  const expenses = computed(() => {
    // filter for negative val only
    return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0 ).toFixed(2);
  });  

  // Add transaction, transactionData is from AddTransaction.vue
  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount
    });

    saveTransactionsToLocalStorage();

    toast.success('Transaction added');
  };

  // Generate unique ID
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000)
  };

  // Delete transaction
  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
  
    saveTransactionsToLocalStorage();

    toast.success('Transaction deleted')
  };

  // Save to local storage
  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };
</script>