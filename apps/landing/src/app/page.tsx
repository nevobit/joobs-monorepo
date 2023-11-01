import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.details}>
        <Image className={styles.first_diamond} src='/diamond.png' width={80} height={80} alt='Diamante' />
        {/* <Image className={styles.firs_diamond} src='/leaf.png' width={80} height={80} alt='Diamante' /> */}
        <Image className={styles.second_diamond} src='/diamond.png' width={100} height={100} alt='Diamante' />
        <Image className={styles.first_pizza} src='/pizza.png' width={80} height={80} alt='Pizza' />
        {/* <Image className={styles.firs_diamond} src='/diamond.png' width={80} height={80} alt='Diamante' /> */}
        {/* <Image className={styles.firs_diamond} src='/diamond.png' width={80} height={80} alt='Diamante' /> */}
        {/* <Image className={styles.firs_diamond} src='/diamond.png' width={80} height={80} alt='Diamante' /> */}
        <Image className={styles.second_pizza} src='/pizza.png' width={80} height={80} alt='Pizza' />
        <Image className={styles.third_diamond} src='/diamond.png' width={100} height={100} alt='Diamante' />
        {/* <Image className={styles.second_diamond} src='/diamond.png' width={100} height={100} alt='Diamante' /> */}
        <Image className={styles.fourth_diamond} src='/diamond.png' width={100} height={100} alt='Diamante' />
        <Image className={styles.third_pizza} src='/pizza.png' width={80} height={80} alt='Pizza' />
      </div>
      <div className={styles.banner}>
          <h1>La comunidad de creadores más grande del mañana</h1>
          <h1>líder uniendo mentes creativas y visionarias</h1>
          <p>Un lugar donde puedes aprender, encontrar oportunidades laborales y conocer personas apasionadas con las que crecer</p>
          <div className={styles.cta}>
            <button><Image src='/play_store.png' width={30} height={30} alt='Play Store Icon' /> Descargar en Play Store</button>
            <button><Image src='/apple-logo.svg' width={30} height={30} alt='App Store Icon' /> Descargar en App Store</button>

          </div>
      </div>
    </main>
  )
}
