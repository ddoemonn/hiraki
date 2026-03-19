import { Root } from './components/root'
import { Trigger } from './components/trigger'
import { Portal } from './components/portal'
import { Overlay } from './components/overlay'
import { Content } from './components/content'
import { Handle } from './components/handle'
import { Title } from './components/title'
import { Description } from './components/description'
import { Close } from './components/close'
import { SnapIndicator } from './components/snap-indicator'
import { ScrollArea } from './components/scroll-area'

export const Drawer = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Handle,
  Title,
  Description,
  Close,
  SnapIndicator,
  ScrollArea,
}

export type {
  Direction,
  Variant,
  SnapPoint,
  SnapPointResolved,
  GestureCallbackData,
  DrawerRootProps,
  DrawerContentProps,
  DrawerOverlayProps,
  DrawerHandleProps,
  DrawerTriggerProps,
  DrawerCloseProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerPortalProps,
  DrawerScrollAreaProps,
  DrawerSnapIndicatorProps,
} from './types'
