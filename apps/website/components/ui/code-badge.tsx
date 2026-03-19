'use client'

import { Fragment } from 'react'
import { cn } from '@/lib/cn'

interface CodeBadgeProps {
  code: string
  active?: boolean
  compact?: boolean
  className?: string
}

type TokenType = 'property' | 'string' | 'number' | 'operator' | 'punctuation' | 'plain' | 'space'

interface Token {
  value: string
  type: TokenType
}

const TOKEN_REGEX = /"[^"]*"|'[^']*'|`[^`]*`|\b\d+(?:\.\d+)?%?\b|[A-Za-z_$][\w$]*|[{}[\](),.=]/g

function tokenize(code: string): Token[] {
  const matches = Array.from(code.matchAll(TOKEN_REGEX))
  const tokens: Token[] = []
  let lastIndex = 0

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]
    if (!match) continue

    const value = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      tokens.push({
        value: code.slice(lastIndex, index),
        type: 'space',
      })
    }

    let type: TokenType = 'plain'

    if (/^["'`]/.test(value)) {
      type = 'string'
    } else if (/^\d/.test(value)) {
      type = 'number'
    } else if (value === '=') {
      type = 'operator'
    } else if (/^[\[\]{}(),.]$/.test(value)) {
      type = 'punctuation'
    } else if (/^[A-Za-z_$][\w$]*$/.test(value)) {
      const nextNonSpace = matches.slice(i + 1).find((candidate) => {
        if (!candidate) return false
        const candidateIndex = candidate.index ?? 0
        return code.slice(index + value.length, candidateIndex).trim().length === 0
      })

      if (nextNonSpace?.[0] === '=') {
        type = 'property'
      }
    }

    tokens.push({ value, type })
    lastIndex = index + value.length
  }

  if (lastIndex < code.length) {
    tokens.push({
      value: code.slice(lastIndex),
      type: 'space',
    })
  }

  return tokens
}

function tokenClass(type: TokenType): string {
  switch (type) {
    case 'property':
      return 'text-[var(--syntax-property)]'
    case 'string':
      return 'text-[var(--syntax-string)]'
    case 'number':
      return 'text-[var(--syntax-number)]'
    case 'operator':
      return 'text-[var(--syntax-operator)]'
    case 'punctuation':
      return 'text-[var(--syntax-punctuation)]'
    case 'space':
      return 'text-inherit'
    default:
      return 'text-[var(--syntax-plain)]'
  }
}

export function CodeBadge({ code, active = false, compact = false, className }: CodeBadgeProps) {
  const tokens = tokenize(code)

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center overflow-hidden rounded-[var(--hiraki-radius)]',
        'transition-colors duration-200',
        active
          ? 'shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
          : 'hover:shadow-[0_6px_16px_rgba(0,0,0,0.04)]',
        compact ? 'px-2 py-0.5 text-xs' : 'px-4 py-2 text-xs',
        'font-mono leading-none',
        className,
      )}
      style={{
        border: `1px solid ${active ? 'var(--code-border-strong)' : 'var(--code-border)'}`,
        background: active ? 'var(--code-bg-active)' : 'var(--code-bg)',
        boxShadow: active
          ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.02)'
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {tokens.map((token, index) => (
        <Fragment key={`${token.value}-${index}`}>
          <span className={tokenClass(token.type)}>{token.value}</span>
        </Fragment>
      ))}
    </span>
  )
}
