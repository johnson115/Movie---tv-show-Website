import Hero from "./hero";

const AboutView = () => {
  const backDrop = `"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"  `;
  return (
    <>
      <div className="text-center">
        <Hero text='about us' />
        <div className="backend" style={{ backgroundImage: `url(${backDrop})` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 my-5">

              </div>
              <p className="text-white">My name amen allah naamen. I am a full stack web developper <br></br> this is my first step of web developpment  and this my first website i hope you enjoy it  </p>

            </div>


            <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
              <div class="col " >
                <div class=" ">
                  <img src="https://cdn-icons-png.flaticon.com/128/3062/3062634.png" class=" rounded-circle" alt="email" />
                  <div class="">
                    <h5 class="text-white">Ask me on gmail :</h5>
                    <a class="card-text text-white" href="https://myaccount.google.com/?hl=fr&utm_source=OGB&utm_medium=act"><img src="https://cdn-icons-png.flaticon.com/128/10829/10829119.png" class="sicon" alt="gmail" /><b class="ch">amencabnaamen@gmail.com</b></a>
                  </div>
                </div>
              </div>

              <div class="col " >
                <div class=" ">
                  <img src="https://cdn-icons-png.flaticon.com/128/724/724664.png" class=" rounded-circle" alt="email" />
                  <div class="">
                    <h5 class="text-white">our service on what's app:</h5>
                    <p class="card-text text-white"><img src="https://cdn-icons-png.flaticon.com/128/3938/3938058.png" alt="whats" class="sicon" /><b className="ch">+21629560974</b></p>
                    <h5 class="text-white">you can call me on phone:</h5>
                    <p class="card-text text-white"><img src="https://cdn-icons-png.flaticon.com/128/901/901120.png" alt="whats" class="sicon" /><b className="ch">+21629560974</b></p>
                  </div>
                </div>
              </div>
              <div class="col " >
                <div class=" ">
                  <img src="https://cdn-icons-png.flaticon.com/128/1968/1968666.png" class="cta-section scale-in-cta animated" alt="email" />
                  <div class="">
                    <h5 class="text-white">my facebook account :</h5>
                    <a class="card-text text-white" href="https://www.facebook.com/profile.php?id=100009878657488"><img src="https://cdn-icons-png.flaticon.com/128/1051/1051258.png" alt="icon fb" className="sicon" />
                      <b className="ch">@amen_johnson</b>
                    </a>
                    <h5 class="text-white">my instagram account </h5>
                    <a class="card-text text-white " href="https://www.instagram.com/J_H_O_N_S_O_N/"><img class="sicon" src="https://cdn-icons-png.flaticon.com/128/174/174855.png" alt="icon insta" /><b className="ch">@amenAllah</b></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AboutView;