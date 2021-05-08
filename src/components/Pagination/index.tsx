import { Box, Button, Stack, Text } from "@chakra-ui/react"
import { PaginationItem } from "./PaginationItem"

interface PaginationProps {
  totalCountofRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

// número de paginas adjacentes visiveis
const sibilingsCount = 1

// função para gerar uma array com as paginas adjacentes
// filter funciona para casos onde a pagina atual está próxima a primeira página, nao renderizando paginas com numeros negativos
function generatePagesArray(from: number, to: number) {
  return [ ...new Array(to - from )]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

export const Pagination = ({ 
  totalCountofRegisters, 
  registerPerPage = 10, 
  currentPage = 1, 
  onPageChange 
}: PaginationProps) => {

  const lastPage = Math.floor(totalCountofRegisters / registerPerPage)

  const previousPages = currentPage > 1 
  ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage - 1)
  : []

  const nextPages = currentPage < lastPage 
  ? generatePagesArray(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
  : []


  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>37</strong>
      </Box>
      <Stack
        direction="row"
        spacing="2"
      >

      {currentPage > (1 + sibilingsCount) && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          
          {currentPage > (sibilingsCount + 2) && (
            <Text
              color="gray.300"
              w="8"
              textAlign="center"
            >...</Text>
          )}
        </>
      )}      

      {previousPages.length > 0 && previousPages.map(page => {
        return <PaginationItem key={page} number={page} onPageChange={onPageChange}/>
      })}
      
      <PaginationItem number={currentPage} onPageChange={onPageChange} isCurrent />

      {nextPages.length > 0 && nextPages.map(page => {
        return <PaginationItem key={page} number={page} onPageChange={onPageChange}/>
      })}      

      {(currentPage + sibilingsCount) < lastPage && (
        <>
          {lastPage - currentPage - sibilingsCount > 1 && (
            <Text
              color="gray.300"
              w="8"
              textAlign="center"
            >...</Text>
          )}
          <PaginationItem number={lastPage} onPageChange={onPageChange}/>
        </>
      )}

      </Stack>
    </Stack>
  )
}
