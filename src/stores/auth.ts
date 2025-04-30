import { defineStore } from 'pinia';
import { computed, onUnmounted, ref } from 'vue';
import { auth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { useToast } from 'vue-toastification';
// import { isSessionExpired } from '@/utilities/isSessionExpired';
import { getErrorMessage } from '@/utilities/errorMessage';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(auth.currentUser);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isLoggedIn = computed(() => {
    return user.value !== null;
  });

  const isAuthenticated = computed(() => {
    // const sessionExpired = isSessionExpired();
    return true;
  });

  console.log(user.value);

  const register = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      user.value = userCredential.user;
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Registration failed!');
      error.value = errorMessage;
      toast.error(errorMessage);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      user.value = userCredential.user;
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Login failed!');
      error.value = errorMessage;
      toast.error(errorMessage);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Something went wrong when signing out.'
      );
      toast.error(errorMessage);
      throw err;
    }
  };

  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    console.log(firebaseUser);
    user.value = firebaseUser;
  });

  const authStateReady = new Promise<void>((resolve) => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      resolve();
    });
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    authStateReady,
    isLoggedIn,
    isAuthenticated,
  };
});
