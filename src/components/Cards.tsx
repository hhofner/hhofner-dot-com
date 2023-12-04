import React from 'react'
import { render } from 'react-dom'
import { motion } from 'framer-motion'
import move from 'lodash-move'

const CARD_COLORS = ['#266678', '#cb7c7a', ' #36a18b', '#cda35f', '#747474']
const CARD_OFFSET = 10
const SCALE_FACTOR = 0.06

export default function CardStack() {
  const [cards, setCards] = React.useState(CARD_COLORS)
  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1))
  }

  return (
    <div className="mt-20 md:mt-0" style={wrapperStyle}>
      <ul style={cardWrapStyle}>
        {cards.map((color, index) => {
          const canDrag = index === 0

          return (
            <motion.li
              key={color}
              className="flex items-end p-6"
              style={{
                ...cardStyle,
                backgroundColor: color,
                cursor: canDrag ? 'grab' : 'auto',
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_COLORS.length - index,
              }}
              drag={canDrag ? 'y' : false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              <h3 className="text-3xl">Hello</h3>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
const wrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const cardWrapStyle = {
  position: 'relative',
  width: '350px',
  height: '220px',
}

const cardStyle = {
  position: 'absolute',
  width: '350px',
  height: '220px',
  borderRadius: '8px',
  transformOrigin: 'top center',
  listStyle: 'none',
}
