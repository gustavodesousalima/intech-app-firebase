import { useAuth } from '../../context/authContext'
import './profile.css'

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className='containerProfile'>
            <h1 className='title_Profile'>Perfil</h1>
            <img src={user.photoURL} alt="Foto de perfil" />
            <p className='text_Profile'>Nome</p>
            <p>{user.displayName}</p>
            <p className='text_Profile'>Email</p>
            <p>{user.email}</p>
            <p className='text_Profile'>Criação da conta em</p>
            <p>{user.metadata.creationTime}</p>
        </div>
    )
}

export default Profile;