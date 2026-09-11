import TopCards from '../components/Home/TopCards'
import TopValues from '../components/Home/TopValues'
import TopUpgrates from '../components/Home/TopUpgrates'
import AllCards from '../components/Home/AllCards'
import type { Product } from '../types/common.types.ts'

interface UserHomeProductSectionProps {
  cards: Product[]
  electranics: Product[]
  mans: Product[]
  womans: Product[]
}

const UserHomeProductSection = ({ cards, electranics, mans, womans }: UserHomeProductSectionProps) => {
  return (
    <div style={{backgroundColor:'#e5e5e5',padding:5}}>
      <TopCards womans={womans} mans={mans} electranics={electranics} />
      <TopValues products={[...mans, ...womans]} />
      <TopUpgrates products={electranics} />
      <AllCards products={cards} />
    </div>

  )
}

export default UserHomeProductSection
