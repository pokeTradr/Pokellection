
const Nav = () => {

    
    return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Digi-Deck</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> 
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    )};
    
    export default Nav;
    
    
    //to do
    //update the image so it corresponds to github image
    //create a color pallet similar to pokemon, so change the menu bar to do that
    //want to link to collections page when clicking collections, do we just do an href? or do I need to add an onclick function?
    
    