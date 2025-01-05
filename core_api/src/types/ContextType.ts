import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../modules/entities.index';
export interface ContextType {
  req: IncomingMessage;
  res: ServerResponse;
  user: User | null;
}
