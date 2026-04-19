let panier = JSON.parse(localStorage.getItem("panier")) || [];

/* 🛒 AJOUT PRODUIT */
function ajouterPanier(nom, id) {

  let variante = "Standard";
  let prix = 0;

  // 🔥 récup select (couleur / taille)
  let select = document.querySelector(`#ml-${id}, #var-${id}`);

  if (select) {
    variante = select.options[select.selectedIndex].text;
    prix = parseInt(select.value) || 0;
  }

  // 🔥 récup image ACTIVE (clé du problème)
  let image =
    document.querySelector(`#${id} .active`)?.src ||
    document.querySelector(`#mainImage`)?.src ||
    "../images/default.jpg";

  // fallback prix
  if (prix === 0) {
    let prixElement = document.getElementById("prix-" + id);
    if (prixElement) {
      prix = parseInt(prixElement.innerText);
    }
  }

  let exist = panier.find(p => p.nom === nom && p.variante === variante);

  if (exist) {
    exist.qty++;
  } else {
    panier.push({
      nom,
      variante,
      prix,
      image,
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
