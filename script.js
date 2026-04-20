let panier = JSON.parse(localStorage.getItem("panier")) || [];

/* 🛒 AJOUT PRODUIT SIMPLE ET FIABLE */
function addToCart(nom, prix, image) {

  let exist = panier.find(p => p.nom === nom);

  if (exist) {
    exist.qty++;
  } else {
    panier.push({
      nom: nom,
      prix: prix,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("panier", JSON.stringify(panier));

  updateCartCount();
  alert("✅ Ajouté au panier !");
}

/* 🔢 compteur */
function updateCartCount() {
  let total = panier.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.getElementById("cart-count");
  if (badge) badge.innerText = total;
}

updateCartCount();