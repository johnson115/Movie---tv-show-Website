import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchText, setSearchText }) => {
  const Test = useNavigate()

  const updateSearchText = (e) => {
    Test('/search')
    setSearchText(e.target.value)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg  ">
        <div>
          <a class="navbar-brand" href="/">
            <img src="https://th.bing.com/th/id/R.3cb85e41659bc0f46ce5a37c36b72ba6?rik=OT%2bZYUfZZyQLqw&riu=http%3a%2f%2fjsunting.com%2fdata%2ffile%2f4010%2f1930813615_t3NGkbyo_cf01d56b960bfe45fcc6a380093344fdc7379e12.png&ehk=LgNvPMDf%2fzyz1XWq4zJQS2RbaYfnxHFMjPxt%2f9kA5l8%3d&risl=&pid=ImgRaw&r=0"  className="logos" alt="Bootstrap" width="100" height="34" to="/"/>
          </a>
        </div>
        <div className="container-fluid">
          <Link className="navbar-brand  text-warning" to="/">Movie Browser</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link active  text-warning " aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-warning" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link disabled  text-warning" to="/">coming soon</Link>
              </li>
            </ul>
            <form className="d-flex " role="search">
              <input className="form-control me-2 text-black search " 
                value={searchText}
                onChange={updateSearchText}
                type="search"
                placeholder="Search" 
                aria-label="Search" />
              <Link className="btn btn-outline-success" type="submit" to="/search/result" >Search</Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;