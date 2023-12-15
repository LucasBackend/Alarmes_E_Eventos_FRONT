import minhaImagem from '../assets/msami.png';

const Logo = () => {

  function navigate(){
    window.location.href = "https://apps.powerapps.com/play/e/default-a7109315-9727-4adf-97ad-4849bb63edcb/a/c1a97402-4d2d-4397-a1a7-ae41801b791b?tenantId=a7109315-9727-4adf-97ad-4849bb63edcb&source=portal&screenColor=rgba(42%2C%2048%2C%2066%2C%201)&hidenavbar=true"
  }

  return (
    <div className="logo" >
      <div className="logoIcon">
        
      <img src={minhaImagem} alt="" width={40} height={40} onClick={navigate}/>
      </div>
    </div>
  )
}

export default Logo