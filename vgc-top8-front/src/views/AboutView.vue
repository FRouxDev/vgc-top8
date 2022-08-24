<script setup lang="ts">
import { ref } from 'vue';
import GenericModal from '../components/GenericModal.vue';
import { useUsersStore } from '@/stores/users';
import type { User } from '@/types/users.type';
import { v4 as uuidv4 } from 'uuid';

const showModal = ref<boolean>(false);
const createdUser = ref<Partial<User>>({});
const modalMode = ref<'create' | 'edit'>('create');

const usersStore = useUsersStore();

const closeModal = () => {
  showModal.value = false;
  modalMode.value = 'create';
};

const createUser = () => {
  if (modalMode.value === 'create') {
    createdUser.value.uuid = uuidv4();
    usersStore.users.push(createdUser.value as User);
  } else if (modalMode.value === 'edit') {
    const userToEdit = usersStore.users.find((user) => user.uuid === createdUser.value.uuid);
    if (userToEdit) {
      userToEdit.username = createdUser.value.username || userToEdit.username;
      userToEdit.email = createdUser.value.email || userToEdit.email;
    }
  }

  createdUser.value = {};
  modalMode.value = 'create';
  showModal.value = false;
};

const editUser = (uuid: string) => {
  const editedUser = usersStore.users.find((user) => user.uuid === uuid);
  if (editedUser) {
    createdUser.value = editedUser;
    showModal.value = true;
    modalMode.value = 'edit';
  }
};
</script>

<template>
  <GenericModal title="Créer / Modifier user" :display="showModal" @modal-close="closeModal" @modal-submit="createUser">
    <div>
      <p><input type="text" v-model="createdUser.username" /></p>
      <p><input type="text" v-model="createdUser.email" /></p>
    </div>
  </GenericModal>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="(user, index) of usersStore.users" :key="index">
        {{ user.username }} - <a @click="editUser(user.uuid as string)">Editer</a>
      </li>
    </ul>
    <button @click="showModal = true">Afficher</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
