<template>
  <div class="jumbotron custom-bg-dark">
    <h1 class="display-4">MEVN Stack Task Manager</h1>
    <p class="lead">This is a sample task manager application.</p>
    <hr class="my-4" />
    <p>Click below to begin managing tasks for users</p>
    <p class="lead">
    <router-link to="/tasks" class="btn btn-success btn-lg">View Tasks</router-link>
    </p>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

