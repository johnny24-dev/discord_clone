import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChannelType } from '../gql/graphql'

export type Modal =
    "CreateServer"
    | "InvitePeople"
    | "UpdateServer"
    | "CreateChannel"
    | "ManageMember"
    | "DeleteChannel"
    | "UpdateChannel"

interface GeneralStore {
    activeModal: Modal | null
    drawerOpen: boolean
    channelTypeForCreateChannel: ChannelType
    channelToBeDeleteOrUpdateId: number | null
    setActiveModal: (modal: Modal | null) => void
    toggleDrawer: () => void
    setChannelTypeForCreateChannel: (type: ChannelType) => void
    setChannelToBeDeleteOrUpdateId: (id: number | null) => void
}

export const useGeneralStore = create<GeneralStore>()(
    persist(
        (set) => (
            {
                activeModal: null,
                drawerOpen: true,
                channelToBeDeleteOrUpdateId: null,
                channelTypeForCreateChannel: ChannelType.Text,
                setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
                toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
                setChannelTypeForCreateChannel: (type) => set(() => ({ channelTypeForCreateChannel: type })),
                setChannelToBeDeleteOrUpdateId: (id) => set(() => ({ channelToBeDeleteOrUpdateId: id })),
            }
        ),
        {
            name: 'general-store'
        }
    )
)