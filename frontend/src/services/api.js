const API_URL = import.meta.env.VITE_API_URL;

// ---------- AUTH ----------
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};


export const register = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data; // 👈 this makes 409 reach catch()
  }

  return data;
};


// ---------- SWEETS ----------
export const getSweets = async (token) => {
  const res = await fetch(`${API_URL}/api/sweets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};


export const searchSweets = async (query, token) => {
  const res = await fetch(
    `${API_URL}/api/sweets/search?name=${query}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
};

export const addSweet = async (sweet, token) => {
  const res = await fetch(`${API_URL}/api/sweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-admin": "true", 
    },
    body: JSON.stringify(sweet),
  });

  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};



export const updateSweet = async (id, sweet, token) => {
  const res = await fetch(`${API_URL}/api/sweets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-admin": "true", 
    },
    body: JSON.stringify(sweet),
  });

  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};


export const deleteSweet = async (id, token) => {
  const res = await fetch(`${API_URL}/api/sweets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-admin": "true", // minimal admin simulation
    },
  });
  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};

// ---------- INVENTORY ----------
export const purchaseSweet = async (id, token) => {
  const res = await fetch(`${API_URL}/api/sweets/${id}/purchase`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};

export const restockSweet = async (id, quantity, token) => {
  const res = await fetch(`${API_URL}/api/sweets/${id}/restock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-admin": "true", // minimal admin simulation
    },
    body: JSON.stringify({ quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};

// ---------- UTIL ----------
export const logout = () => {
  localStorage.removeItem("token");
};
