import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { digital } from '../../pages/_app'

interface MatrixLine {
	numbers: number[]
	left: number
	startY: number
	endY: number
	speed: number
	delay: number
}

interface MatrixDimension {
	width: number
	height: number
}

const MatrixBackground: React.FC = () => {
	// const [lines, setLines] = useState<MatrixLine[]>([])

	// const generateLine = (): MatrixLine => {
	// 	const numberOfElements = 20 // Número de elementos por linha
	// 	const width = screen.width
	// 	const height = screen.height
	// 	const left = Math.random() * width

	// 	return {
	// 		numbers: Array.from({ length: numberOfElements }, () => Math.floor(Math.random() * 10)),
	// 		left,
	// 		startY: -numberOfElements * 50, // Ajuste conforme a altura de cada número
	// 		endY: height,
	// 		speed: Math.random() * 10 + 15 // Velocidade entre 15 e 25 segundos
	// 	}
	// }

	const [lines, setLines] = useState<MatrixLine[]>([])
	const [dimensions, setDimensions] = useState<MatrixDimension | null>(null)
	const [changingNumber, setChangingNUmber] = useState(0)

	useEffect(() => {
		setDimensions({ width: window.innerWidth, height: window.innerHeight })
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => setChangingNUmber(Math.round(Math.random())), 10)
	}, [changingNumber])

	const isXValid = (newX: number, usedX: Set<number>): boolean => {
		for (let x of usedX) {
			if (Math.abs(newX - x) < 20) {
				return false // Retorna falso se newX estiver muito próximo de um x existente
			}
		}
		return true
	}

	const generateUniqueX = (usedX: Set<number>, maxWidth: number): number => {
		let newX
		do {
			newX = Math.floor(Math.random() * maxWidth)
		} while (!isXValid(newX, usedX))
		usedX.add(newX)
		return newX
	}

	// const getChangingNumber = () => {
	// 	const number = () => Math.round(Math.random())

	// 	return number
	// }

	const generateLines = (numLines: number, width: number, height: number): MatrixLine[] => {
		const usedXPositions = new Set<number>()
		const numberOfElements = 20 // Número de elementos por linha

		return Array.from({ length: numLines }).map((a, index) => ({
			numbers: Array.from({ length: numberOfElements }, () => Math.round(Math.random())),
			left: generateUniqueX(usedXPositions, width),
			startY: -numberOfElements * 30, // Ajuste conforme a altura de cada número
			endY: height,
			speed: Math.random() * 10 + 15, // Velocidade entre 15 e 25 segundos
			delay: index * 0.5
		}))
	}

	useEffect(() => {
		if (dimensions) {
			const handleResize = () => {
				const newDimensions = { width: window.innerWidth, height: window.innerHeight }
				setDimensions(newDimensions)
				setLines(generateLines(30, newDimensions.width, newDimensions.height))
			}

			window.addEventListener('resize', handleResize)
			setLines(generateLines(30, dimensions.width, dimensions.height))

			return () => window.removeEventListener('resize', handleResize)
		}
	}, [dimensions])

	// useEffect(() => {
	// 	// Função para lidar com o redimensionamento da janela
	// 	const handleResize = () => {
	// 		setLines(Array.from({ length: 40 }, generateLine)); // Ajuste o número de linhas iniciais
	// 	}

	// 	// Definindo os números iniciais
	// 	setLines(Array.from({ length: 40 }, generateLine)); // Ajuste o número de linhas iniciais

	// 	// Adicionando o ouvinte de evento de redimensionamento
	// 	window.addEventListener('resize', handleResize)

	// 	// Removendo o ouvinte de evento quando o componente for desmontado
	// 	return () => window.removeEventListener('resize', handleResize)
	// }, [])

	return (
		<div className='flex absolute top-0 bottom-0 right-0 left-0 overflow-hidden min-h-screen h-screen w-screen border border-secondary'>
			{lines.map((line, index) => (
				<motion.div
					key={index}
					initial={{ y: line.startY, x: line.left }}
					animate={{ y: [line.startY, line.endY] }}
					transition={{ repeat: Infinity, duration: line.speed, delay: line.delay }}
					className='absolute'
				>
					{line.numbers.map((num, numIndex) => (
						<div
							key={numIndex}
							className={`${digital.className} text-secondary text-2xl leading-5 blur-[2px]	`}
						>
							{num}
						</div>
					))}
				</motion.div>
			))}
		</div>
	)
}

export default MatrixBackground
