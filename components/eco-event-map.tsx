"use client"

import { useState, useEffect } from 'react'
import { YMaps, Map, Placemark, ZoomControl, SearchControl } from '@pbe/react-yandex-maps'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, SearchIcon, TagIcon, UserIcon } from 'lucide-react'

type EventStatus = 'предстоящее' | 'текущее' | 'завершенное'
type EventSource = 'пользователь' | 'организация' | 'система'

type Event = {
  id: number
  title: string
  startDate: string
  endDate: string
  publicLocation: string
  internalLocation: string
  type: string
  description: string
  status: EventStatus
  source: EventSource
  organizer: {
    name: string
    avatar: string
    contact: string
  }
  participants: number
  tags: string[]
  createdAt: string
  updatedAt: string
  assignedModerator?: number
  comments: Comment[]
  price?: string
  ageRestriction?: string
  website?: string
  coordinates: [number, number]
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Посадка деревьев в сообществе",
    startDate: "2023-06-15T10:00:00",
    endDate: "2023-06-15T14:00:00",
    publicLocation: "Центральный парк",
    internalLocation: "Северный вход",
    type: "посадка",
    description: "Присоединяйтесь к нам для посадки деревьев, чтобы озеленить наш город!",
    status: "предстоящее",
    source: "организация",
    organizer: {
      name: "Инициатива Зеленый Город",
      avatar: "/placeholder.svg?height=50&width=50",
      contact: "contact@greencity.org"
    },
    participants: 50,
    tags: ["посадка деревьев", "сообщество", "экология"],
    createdAt: "2023-05-01T12:00:00",
    updatedAt: "2023-05-01T12:00:00",
    comments: [],
    coordinates: [55.751244, 37.618423]
  },
  {
    id: 2,
    title: "Уборка пляжа",
    startDate: "2023-06-20T09:00:00",
    endDate: "2023-06-20T13:00:00",
    publicLocation: "Солнечный пляж",
    internalLocation: "Главный вход",
    type: "уборка",
    description: "Помогите нам очистить наш прекрасный пляж и защитить морскую жизнь!",
    status: "предстоящее",
    source: "пользователь",
    organizer: {
      name: "Группа любителей океана",
      avatar: "/placeholder.svg?height=50&width=50",
      contact: "info@oceanlovers.com"
    },
    participants: 30,
    tags: ["уборка пляжа", "океан", "экология"],
    createdAt: "2023-05-05T14:00:00",
    updatedAt: "2023-05-05T14:00:00",
    comments: [],
    coordinates: [55.753215, 37.622504]
  },
  {
    id: 3,
    title: "Эко-семинар: Устойчивый образ жизни",
    startDate: "2023-06-25T15:00:00",
    endDate: "2023-06-25T17:00:00",
    publicLocation: "Общественный центр",
    internalLocation: "Комната 101",
    type: "образование",
    description: "Узнайте практические советы по устойчивому образу жизни на этом интерактивном семинаре.",
    status: "предстоящее",
    source: "организация",
    organizer: {
      name: "Инициатива ЭкоОбразование",
      avatar: "/placeholder.svg?height=50&width=50",
      contact: "workshops@ecoed.org"
    },
    participants: 25,
    tags: ["семинар", "устойчивый образ жизни", "образование"],
    createdAt: "2023-05-10T10:00:00",
    updatedAt: "2023-05-10T10:00:00",
    comments: [],
    price: "Бесплатно",
    ageRestriction: "16+",
    website: "https://ecoed.org/workshops",
    coordinates: [55.746201, 37.620767]
  }
]

export function EcoEventMap() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [filters, setFilters] = useState({ type: '', date: '', search: '' })
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    setUserLocation([55.751244, 37.618423])
  }, [])

  const filterEvents = () => {
    return mockEvents.filter(event => 
      (!filters.type || event.type === filters.type) &&
      (!filters.date || event.startDate.startsWith(filters.date)) &&
      (!filters.search || event.title.toLowerCase().includes(filters.search.toLowerCase()) || 
       event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
       event.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase())))
    )
  }

  useEffect(() => {
    setEvents(filterEvents())
  }, [filters])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEvents(filterEvents())
  }

  return (
    <div className="flex flex-col h-screen bg-[#e6f3f5]">
      <div className="flex-none p-4 bg-[#2a9d8f] text-white">
        <h1 className="text-2xl font-bold">Эко-карта событий</h1>
      </div>
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 bg-[#f0f9fa]">
          <Tabs defaultValue="suggested">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggested">Рекомендуемые</TabsTrigger>
              <TabsTrigger value="search">Поиск</TabsTrigger>
            </TabsList>
            <TabsContent value="suggested">
              <ScrollArea className="h-[calc(100vh-200px)]">
                {events.map(event => (
                  <Card key={event.id} className="mb-4 bg-white">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#264653]">{event.title}</h3>
                      <p className="text-sm text-[#2a9d8f] mb-2">{event.description}</p>
                      <div className="flex items-center mb-1">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
                        <span className="text-sm">{new Date(event.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <MapPinIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
                        <span className="text-sm">{event.publicLocation}</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <UserIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
                        <span className="text-sm">{event.participants} участников</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.map(tag => (
                          <span key={tag} className="bg-[#e9f5f4] text-[#2a9d8f] text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button className="mt-2 w-full bg-[#2a9d8f] hover:bg-[#264653]" onClick={() => setSelectedEvent(event)}>Подробнее</Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="search">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Поиск событий..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="bg-white"
                  />
                  <Button type="submit" className="bg-[#2a9d8f] hover:bg-[#264653]"><SearchIcon className="h-4 w-4" /></Button>
                </div>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters({...filters, type: value})}
                >
                  <option value="">Все типы</option>
                  <option value="посадка">Посадка деревьев</option>
                  <option value="уборка">Уборка</option>
                  <option value="образование">Образование</option>
                </Select>
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({...filters, date: e.target.value})}
                  className="bg-white"
                />
                <Button 
                  onClick={() => setFilters({ type: '', date: '', search: '' })}
                  variant="outline"
                  className="w-full border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#e9f5f4]"
                >
                  Очистить фильтры
                </Button>
              </form>
              <ScrollArea className="h-[calc(100vh-350px)] mt-4">
                {events.map(event => (
                  <Card key={event.id} className="mb-4 bg-white">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#264653]">{event.title}</h3>
                      <p className="text-sm text-[#2a9d8f] mb-2">{event.description}</p>
                      <div className="flex items-center mb-1">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
                        <span className="text-sm">{new Date(event.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <MapPinIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
                        <span className="text-sm">{event.publicLocation}</span>
                      </div>
                      <Button className="mt-2 w-full bg-[#2a9d8f] hover:bg-[#264653]" onClick={() => setSelectedEvent(event)}>Подробнее</Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex-grow p-4">
          <YMaps>
            <Map 
              defaultState={{ center: userLocation || [55.751244, 37.618423], zoom: 11 }}
              width="100%"
              height="100%"
            >
              <ZoomControl ptions={{ position: { right: 10, top: 10 } }} />
              <SearchControl options={{ float: 'left' }} />
              {events.map((event) => (
                <Placemark
                  key={event.id}
                  geometry={event.coordinates}
                  properties={{
                    balloonContentBody: `
                      <h3>${event.title}</h3>
                      <p>Тип: ${event.type}</p>
                      <p>Дата: ${new Date(event.startDate).toLocaleDateString()}</p>
                    `
                  }}
                  options={{
                    preset: 'islands#darkGreenDotIcon',
                  }}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
              {userLocation && (
                <Placemark
                  geometry={userLocation}
                  options={{
                    preset: 'islands#blueCircleDotIcon',
                  }}
                  properties={{
                    balloonContent: 'Ваше местоположение'
                  }}
                />
              )}
            </Map>
          </YMaps>
        </div>
      </div>
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 md:left-1/3 md:right-auto md:w-1/3 bg-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2 text-[#264653]">{selectedEvent.title}</h2>
            <p className="text-sm text-[#2a9d8f] mb-2">{selectedEvent.description}</p>
            <div className="flex items-center mb-1">
              <CalendarIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
              <span className="text-sm">
                {new Date(selectedEvent.startDate).toLocaleString()} - {new Date(selectedEvent.endDate).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center mb-1">
              <MapPinIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
              <span className="text-sm">{selectedEvent.publicLocation}</span>
            </div>
            <div className="flex items-center mb-1">
              <UserIcon className="mr-2 h-4 w-4 text-[#2a9d8f]" />
              <span className="text-sm">{selectedEvent.participants} участников</span>
            </div>
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={selectedEvent.organizer.avatar} alt={selectedEvent.organizer.name} />
                <AvatarFallback>{selectedEvent.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-[#264653]">{selectedEvent.organizer.name}</p>
                <p className="text-xs text-[#2a9d8f]">{selectedEvent.organizer.contact}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedEvent.tags.map(tag => (
                <span key={tag} className="bg-[#e9f5f4] text-[#2a9d8f] text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            {selectedEvent.price && (
              <p className="text-sm mt-2 text-[#264653]">Цена: {selectedEvent.price}</p>
            )}
            {selectedEvent.ageRestriction && (
              <p className="text-sm text-[#264653]">Возрастное ограничение: {selectedEvent.ageRestriction}</p>
            )}
            {selectedEvent.website && (
              <a href={selectedEvent.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2a9d8f] hover:underline mt-2 block">
                Посетить сайт
              </a>
            )}
            <Button className="mt-4 w-full bg-[#2a9d8f] hover:bg-[#264653]" onClick={() => setSelectedEvent(null)}>Закрыть</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}