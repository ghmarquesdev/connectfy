import { PiListThin } from 'react-icons/pi'
import { LuHome, LuUser } from 'react-icons/lu'
import { LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { ActiveLink } from './active-link'

import { ToggleTheme } from '../toggle-theme'
import { ButtonLogout } from '../button-logout'

type LinkMenuProps = {
  nickname: string
}

export function LinkMenu({ nickname }: LinkMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          <PiListThin />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <ActiveLink href="/feed">
            <LuHome />
            <span className="text-sm font-medium">Inicio</span>
          </ActiveLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ActiveLink href={`/${nickname}`}>
            <LuUser />
            <span className="text-sm font-medium">Perfil</span>
          </ActiveLink>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ToggleTheme />
        </DropdownMenuItem>

        <DropdownMenuItem className="px-5 py-2">
          <ButtonLogout className="text-rose-600 dark:text-rose-500 w-full">
            <LogOut className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span className="text-sm font-medium">Sair da conta</span>
          </ButtonLogout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
