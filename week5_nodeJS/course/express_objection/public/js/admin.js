const deleteButton = (btn) =>{
    const productId = btn.parentNode.querySelector('[name=prodId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

    const productElement = btn.parentNode.parentNode.parentNode;
    console.log(productId);
    fetch('/admin/product/'+productId,{
        method:'DELETE',
        headers:{
            'csrf-token':csrfToken
        }
    })
    .then(result=>{
        return result.json();
    })
    .then(data=>{
        productElement.parentNode.removeChild(productElement);
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })
}