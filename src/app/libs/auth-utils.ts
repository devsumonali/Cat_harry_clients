export function getPasswordError(password: unknown): string | null {
     if (typeof password !== 'string' || password.length < 6) return 'Password must contain at least 6 characters.';
     if (password.length > 128) return 'Password cannot exceed 128 characters.';
     if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter.';
     if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter.';
     return null;
}

export function getSafeCallbackURL(value: string | null): string {
     if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\x00-\x20]|%2f|%5c/i.test(value)) return '/';
     const url = new URL(value, 'http://localhost');
     if (url.origin !== 'http://localhost' || /^\/(?:login|register|api)(?:\/|$)/.test(url.pathname)) return '/';
     return url.pathname + url.search + url.hash;
}
