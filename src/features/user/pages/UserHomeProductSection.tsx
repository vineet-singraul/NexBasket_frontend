import TopCards from '../components/Home/TopCards'
import TopValues from '../components/Home/TopValues'
import TopUpgrates from '../components/Home/TopUpgrates'
import AllCards from '../components/Home/AllCards'
import type { Product } from '../types/common.types.ts'
import { PRODUCT_SECTION_BG, PRODUCT_SECTION_PADDING } from '../utils/context.ts'

interface UserHomeProductSectionProps {
  cards: Product[]
  electranics: Product[]
  mans: Product[]
  womans: Product[]
  grocery: Product[]
}

const UserHomeProductSection = ({ cards, electranics, mans, womans, grocery }: UserHomeProductSectionProps) => {
  return (
    <div style={{ backgroundColor: PRODUCT_SECTION_BG, padding: PRODUCT_SECTION_PADDING }}>
      <TopCards womans={womans} mans={mans} electranics={electranics} grocery={grocery} />
      <TopValues products={[...mans, ...womans]} />
      <TopUpgrates products={electranics} />
      <AllCards products={cards} />
    </div>

  )
}

export default UserHomeProductSection
