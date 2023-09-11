function Email () {
    function handleCopy () {
        const email = document.querySelector(".email");
        let text = document.querySelector('.email').innerText;

        const copyContent = async () => {
          try {
            await navigator.clipboard.writeText(text);
            setTimeout(() => {
                email.innerText = "marika.basagoitia@gmail.com";
            }, 3000)
            email.innerText = "Email copied to clipboard!";
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
        }
        
        copyContent();
     
    }

    return <span className="email d-inline mx-2" onClick={handleCopy}>marika.basagoitia@gmail.com</span>
}

export default Email;