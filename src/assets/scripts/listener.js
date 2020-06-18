import Router from './Router';

export default function(e) {
  const router = new Router();
  if (this.dataset.internal === '1') {
    e.preventDefault()
    if (!e.target.classList.contains('star-btn')) {
      router.navigate(this.pathname)
    }
  }
}