import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Finance Dashboard
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/upload" className="hover:text-gray-300">
              Upload CSV
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar