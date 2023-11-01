import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <h1>Joobs</h1>
        <nav>
            <Link href=''>Contratar</Link>
            <Link href=''>Buscar trabajo</Link>
            <Link href=''>Proyectos</Link>
            <Link href=''>Comunidad</Link>
            <Link href=''>Eventos</Link>
        </nav>
        <button>Registrarme</button>
    </header>
  )
}

export default Header