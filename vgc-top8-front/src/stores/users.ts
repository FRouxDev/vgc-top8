import { USER_LIST } from '@/mocks/users.mocks';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: USER_LIST,
  }),
});
