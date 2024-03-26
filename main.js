const spendingInput = document.querySelector("#spending-input")
const priceInput = document.querySelector("#price-input")
const formBtn = document.querySelector(".btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(price) {
    total += Number(price);
    totalInfo.innerText = total;

}
//gier olusturma 

function addExpense(e) {
    e.preventDefault();

    if (priceInput.value == "" || spendingInput.value == "") {
        alert("Harcama veya fiyat bilgisi giriniz")
        return;
    }
    // kullanici veri girdiginde ekle dediginde div olusutrma
    const spendingDiv = document.createElement("div");

    //clas ekleme
    spendingDiv.classList.add("spending");

    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");
    }
    //
    spendingDiv.innerHTML = `<h2>${spendingInput.value}</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="images/payment.png" alt="">
        <img id="remove" src="images/delete.png" alt="">
    </div>`

    // listeye elemen ekleme
    list.appendChild(spendingDiv);
    //toplami guncelle
    updateTotal(priceInput.value);
    //formu temizle
    spendingInput.value = "";
    priceInput.value = 0;
}

function handleClick(e) {
    const element = e.target;
    //console.dir(element)
    if (element.id === "remove") {
        const wrapper = element.parentElement.parentElement;
        //console.log(wrapper)
        //silinen elemanin fiyatini alma
        const deletedPrice = wrapper.querySelector("#value").innerText;
        Number(deletedPrice.innerText);
        // silinenin fiyatını toplamdan çıkarma
        // updateTotal'İ güncelleme
        updateTotal(-Number(deletedPrice));

        // kapsayıcıyı kaldır
        wrapper.remove()
    }
}

/* filtreleme işlemleri */
function handleFilter(e) {
    console.log(e.target.value);
  
    // Öğeleri seç
    const items = list.childNodes;
    items.forEach((item) => {
      switch (e.target.value) {
        case "all":
          item.style.display = "flex";
          break;
  
        case "payed":
          // "payed" sınıfına sahip olanları görünür yap, diğerlerini gizle
          if (item.classList.contains("payed")) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
          break;
  
        case "not-payed":
          // "payed" sınıfına sahip olmayanları görünür yap, diğerlerini gizle
          if (item.classList.contains("payed")) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
          break;
      }
    });
  }
