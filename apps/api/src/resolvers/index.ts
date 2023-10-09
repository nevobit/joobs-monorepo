import { StatusType, Type, Work } from '@joobs/entities'

export const getData = () => {
    const works : Work = {
        title: '',
        skills: [],
        role: '',
        location: {
            type: Type.WorkHome,          
            coords: {
                lat: 0,
                long: 0,
                city: '',
                country: '',
            }
        },
        description: '',
        uuid: '',
        status: StatusType.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
    }
}