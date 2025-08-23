class TrainWithCardiacFrequency {
  age: number = 31
  FCR: number = 56 // FC repos
  FCMFormula: number = 208 - 0.7 * this.age // Formule de Tanaka (2001)
  FCM: string = this.FCMFormula.toFixed(0).toString()

  // Obtenir la fréquence cardiaque de réserve
  // FCM - FCR = FCR
  getFCR(): string {
    const result: number = Number(this.FCM) - this.FCR
    return result.toFixed(0).toString()
  }

  // Obtenir la fréquence cardiaque cible (Méthode de Karvonen)
  //FCE = (% d'intensité souhaitée * FC Réserve) + FC Repos
  // intensity est un float (0.7)
  getFCE(intensity: number): string {
    const FCR = Number(this.getFCR())

    const result = intensity * FCR + this.FCR

    return result.toFixed(0).toString()
  }

  getFCMaxWithIntensity(intensity: number): string {
    const result = intensity * this.FCMFormula

    return result.toFixed(0).toString()
  }
}

export const trainWithCardiacFrequency = new TrainWithCardiacFrequency()
