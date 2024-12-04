import arrow from './../assets/arrow-right.svg';

const LinkClients = () => {
    return(
        <div>
        <span style={{fontSize: '14px', color: 'rgb(31, 151, 243)', display: 'flex', cursor: 'pointer'}}>Ver clientes <img src={arrow} alt="" /></span>
      </div>
    )
}
export default LinkClients;