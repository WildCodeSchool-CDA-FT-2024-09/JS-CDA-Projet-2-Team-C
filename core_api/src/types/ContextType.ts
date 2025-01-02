import { IncomingMessage, ServerResponse } from 'http';

export interface ContextType {
  req: IncomingMessage;
  res: ServerResponse;
}
