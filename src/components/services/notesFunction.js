export const formatDate = (date) => {
    const d = new Date(date);
    let timeNow = d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    let newD = d.toLocaleDateString(('en-US'), {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    return newD + ' ' + timeNow;
  }

