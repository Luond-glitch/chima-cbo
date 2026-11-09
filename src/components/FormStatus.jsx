import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function FormStatus({ status }) {
  if (!status || status.state === 'idle') return null;
  if (status.state === 'error')
    return <div className="form-status error" role="alert"><AlertCircle size={18} /> {status.message}</div>;
  if (status.state === 'success')
    return <div className="form-status success" role="status"><CheckCircle2 size={18} /> {status.message}</div>;
  return null;
}
