'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Leaf, MessageCircle, Search, Users } from 'lucide-react'

export function EcoCommunityListComponent() {
  const [searchTerm, setSearchTerm] = useState("")

  const communities = [
    {
      id: 1,
      name: "Зеленый Город",
      description: "Мы садим деревья и озеленяем городские пространства",
      members: 1234,
      posts: 567,
      category: "Озеленение",
      telegram: "https://t.me/greentown",
      vk: "https://vk.com/greentown"
    },
    {
      id: 2,
      name: "ЭкоСортировка",
      description: "Учим правильно сортировать мусор и перерабатывать отходы",
      members: 987,
      posts: 432,
      category: "Переработка",
      telegram: "https://t.me/ecosort",
      vk: "https://vk.com/ecosort"
    },
    {
      id: 3,
      name: "Чистый Двор",
      description: "Организуем субботники и поддерживаем чистоту в наших дворах",
      members: 756,
      posts: 321,
      category: "Уборка",
      telegram: "https://t.me/cleanyard",
      vk: "https://vk.com/cleanyard"
    },
    {
      id: 4,
      name: "ЭкоТранспорт",
      description: "Продвигаем использование велосипедов и общественного транспорта",
      members: 543,
      posts: 210,
      category: "Транспорт",
      telegram: "https://t.me/ecotransport",
      vk: "https://vk.com/ecotransport"
    },
    {
      id: 5,
      name: "Зеленая Энергия",
      description: "Поддерживаем развитие возобновляемых источников энергии",
      members: 876,
      posts: 345,
      category: "Энергетика",
      telegram: "https://t.me/greenenergy",
      vk: "https://vk.com/greenenergy"
    }
  ]

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F0F4F0] text-[#2C3E2D] p-6">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Эко-Сообщества</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuItem>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            className="pl-10 pr-4 py-2 w-full bg-white" 
            placeholder="Поиск сообществ..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {filteredCommunities.map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}

function CommunityCard({ community } : any) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${community.name[0]}`} alt={community.name} />
          <AvatarFallback>{community.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">{community.name}</CardTitle>
          <Badge variant="secondary">{community.category}</Badge>
        </div>
        <div className="flex space-x-2">
          <a href={community.telegram} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="w-10 h-10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.18-.04-.26-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.26-1.45-.4-1.4-.85.03-.22.35-.45.96-.68 3.78-1.65 6.31-2.74 7.59-3.29 3.61-1.55 4.36-1.82 4.85-1.82.11 0 .35.03.51.14.13.1.17.23.19.33.02.12.01.28-.01.43z"/>
              </svg>
              <span className="sr-only">Telegram</span>
            </Button>
          </a>
          <a href={community.vk} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="w-10 h-10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.45-1.71-1.45-1.07-1.02-1.54-1.16-1.8-1.16-.37 0-.47.1-.47.59v1.33c0 .41-.13.66-1.22.66-1.8 0-3.8-1.09-5.21-3.12-2.11-2.97-2.69-5.19-2.69-5.65 0-.24.08-.47.59-.47h1.46c.44 0 .61.21.78.71.85 2.47 2.29 4.63 2.88 4.63.22 0 .32-.1.32-.66V9.04c-.07-1.18-.69-1.28-.69-1.7 0-.21.17-.41.46-.41h2.3c.31 0 .42.21.42.66v3.54c0 .38.11.51.18.51.22 0 .41-.14.82-.55 1.27-1.42 2.17-3.6 2.17-3.6.12-.25.25-.48.63-.48h1.46c.44 0 .54.23.44.62-.18.86-1.98 3.41-1.98 3.41-.16.26-.22.38 0 .67.15.21.66.65 1 1.04.62.71 1.09 1.31 1.22 1.72.11.41-.09.62-.51.62z"/>
              </svg>
              <span className="sr-only">VKontakte</span>
            </Button>
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{community.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{community.members} участников</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span>{community.posts} постов</span>
          </div>
          <div className="flex items-center">
            <Leaf className="w-4 h-4 mr-1" />
            <span>Активность: Высокая</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}