import { defineStore } from 'pinia';
import { computed, onUnmounted, ref } from 'vue';
import { auth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  updateProfile,
} from 'firebase/auth';
import { useToast } from 'vue-toastification';
import { isSessionExpired } from '@/utilities/isSessionExpired';
import { getErrorMessage } from '@/utilities/errorMessage';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(auth.currentUser);
  const lastLoginAt = ref<number | undefined>(undefined);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => {
    if (!!lastLoginAt.value) {
      return !isSessionExpired(lastLoginAt.value);
    }

    return false;
  });

  const getToken = async () => {
    return await auth?.currentUser?.getIdToken();
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
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
      await signInWithEmailAndPassword(auth, email, password);
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
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Something went wrong when signing out.'
      );
      toast.error(errorMessage);
      throw err;
    }
  };

  const authStateReady = new Promise<void>((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser;

      if (firebaseUser) {
        const idTokenResult = await firebaseUser?.getIdTokenResult();
        lastLoginAt.value = new Date(idTokenResult.authTime).getTime();
      } else {
        lastLoginAt.value = undefined;
      }

      resolve();
    });
  });

  onUnmounted(() => authStateReady);

  return {
    user,
    isLoading,
    error,
    authStateReady,
    isAuthenticated,
    lastLoginAt,
    register,
    login,
    logout,
    getToken,
  };
});
