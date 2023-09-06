<script setup>
import { ref, computed, onMounted} from 'vue'

// 给每个 todo 对象一个唯一的 id
let id = 0
const pElementRef = ref(null)
const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

const filteredTodos = computed(() => {
  return hideCompleted.value
      ? todos.value.filter((t) => !t.done)
      : todos.value
})

onMounted(() => {
  pElementRef.value.textContent = 'mounted1'
})

function addTodo() {
  // ...
  if (newTodo.value != '') {
    todos.value.push({id: id++, text: newTodo.value})
  }

  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <div>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? 'Show all' : 'Hide completed' }}
    </button>
    <p>
      input newTodo : {{ newTodo }}
    </p>
    <p>onMounted修改后需要重新部署项目？</p>
    <p ref="pElementRef">hello</p>
  </div>

</template>
