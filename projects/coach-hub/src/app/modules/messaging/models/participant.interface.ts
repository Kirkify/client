export interface ParticipantInterface {
  id: number;
  user_id: number;
  thread_id: number;
  is_admin: boolean;
  last_read?: string;
  current_user?: boolean;
}
