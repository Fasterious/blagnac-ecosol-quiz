/**
 * Récupère l'adresse IP de l'utilisateur
 * Utilise un service externe pour obtenir l'IP publique
 */
export async function getIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'IP:', error);
    return 'unknown';
  }
}

