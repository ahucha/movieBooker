
function generateToken(user) {
  const userJson = JSON.stringify(user);
  const encoded = btoa(userJson); 
  return encoded;
}

function verifyToken(token) {
  try {
    const decoded = atob(token); 
    const user = JSON.parse(decoded);
    return user;
  } catch (error) {
    console.error("Token invalide !");
    return null;
  }
}

const user = {
  username: "antoine_dev",
  email: "antoine@example.com",
};

const token = generateToken(user);
console.log("Token généré :", token);

const verifiedUser = verifyToken(token);
console.log("Utilisateur vérifié :", verifiedUser);
