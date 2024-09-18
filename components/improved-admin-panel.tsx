'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckIcon, XIcon, CalendarIcon, MapPinIcon, UserIcon, TagIcon, ClockIcon, SearchIcon, FilterIcon, EditIcon, MessageSquareIcon, UserPlusIcon, LockIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type EventSource = 'частная инициатива' | 'организаторы' | 'парсер'
type EventStatus = 'на модерации' | 'одобрено' | 'отклонено'

type Moderator = {
  id: number
  name: string
  avatar: string
}

type Comment = {
  id: number
  moderatorId: number
  text: string
  createdAt: string
}

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
}

const moderators: Moderator[] = [
  { id: 1, name: "Анна Модератова", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Иван Проверкин", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Елена Контролева", avatar: "/placeholder.svg?height=40&width=40" },
]

export function ImprovedAdminPanelComponent() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [comment, setComment] = useState('')
  const [sourceFilter, setSourceFilter] = useState<EventSource | 'all'>('all')
  const eventsPerPage = 5

  useEffect(() => {
    // Simulating API call to fetch events
    // In a real application, you would fetch data from an API here
    setEvents([])
  }, [])

  useEffect(() => {
    let result = events

    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (dateRange.from && dateRange.to) {
      result = result.filter(event => 
        new Date(event.startDate) >= new Date(dateRange.from) &&
        new Date(event.endDate) <= new Date(dateRange.to)
      )
    }

    if (sourceFilter !== 'all') {
      result = result.filter(event => event.source === sourceFilter)
    }

    setFilteredEvents(result)
  }, [events, searchTerm, dateRange, sourceFilter])

  const handleApprove = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'одобрено', updatedAt: new Date().toISOString(), comments: [...event.comments, { id: Date.now(), moderatorId: 1, text: comment, createdAt: new Date().toISOString() }] } : event
    ))
    setComment('')
  }

  const handleReject = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'отклонено', updatedAt: new Date().toISOString(), comments: [...event.comments, { id: Date.now(), moderatorId: 1, text: comment, createdAt: new Date().toISOString() }] } : event
    ))
    setComment('')
  }

  const handleBulkApprove = () => {
    setEvents(events.map(event => 
      selectedEvents.includes(event.id) ? { ...event, status: 'одобрено', updatedAt: new Date().toISOString() } : event
    ))
    setSelectedEvents([])
  }

  const handleBulkReject = () => {
    setEvents(events.map(event => 
      selectedEvents.includes(event.id) ? { ...event, status: 'отклонено', updatedAt: new Date().toISOString() } : event
    ))
    setSelectedEvents([])
  }

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSaveEvent = () => {
    if (currentEvent) {
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ))
      setIsEditModalOpen(false)
    }
  }

  const handleAssignModerator = (eventId: number, moderatorId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, assignedModerator: moderatorId } : event
    ))
  }

  const getSourceBadgeVariant = (source: EventSource) => {
    switch (source) {
      case 'организаторы': return 'default'
      case 'частная инициатива': return 'secondary'
      case 'парсер': return 'outline'
    }
  }

  const getEventStatistics = () => {
    const total = events.length
    const pending = events.filter(e => e.status === 'на модерации').length
    const approved = events.filter(e => e.status === 'одобрено').length
    const rejected = events.filter(e => e.status === 'отклонено').length

    return { total, pending, approved, rejected }
  }

  const stats = getEventStatistics()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Поиск событий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-8"
              />
            </div>
            <div className="flex space-x-2">
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-40"
              />
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-40"
              />
            </div>
            <Select value={sourceFilter} onValueChange={(value: EventSource | 'all') => setSourceFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите источник" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все источники</SelectItem>
                <SelectItem value="частная инициатива">Частная инициатива</SelectItem>
                <SelectItem value="организаторы">Организаторы</SelectItem>
                <SelectItem value="парсер">Парсер</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleBulkApprove} disabled={selectedEvents.length === 0}>
              Одобрить выбранные
            </Button>
            <Button onClick={handleBulkReject} disabled={selectedEvents.length === 0}>
              Отклонить выбранные
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Всего событий</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>На модерации</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Одобрено</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="на модерации">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="на модерации">На модерации</TabsTrigger>
            <TabsTrigger value="одобрено">Одобренные</TabsTrigger>
            <TabsTrigger value="отклонено">Отклоненные</TabsTrigger>
          </TabsList>
          {['на модерации', 'одобрено', 'отклонено'].map((status) => (
            <TabsContent key={status} value={status}>
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                {filteredEvents
                  .filter(event => event.status === status)
                  .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                  .map(event => (
                  <Card key={event.id} className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedEvents.includes(event.id)}
                            onCheckedChange={(checked) => {
                              setSelectedEvents(
                                checked
                                  ? [...selectedEvents, event.id]
                                  : selectedEvents.filter(id => id !== event.id)
                              )
                            }}
                          />
                          <CardTitle className="text-lg font-semibold text-emerald-700">{event.title}</CardTitle>
                        </div>
                        <Badge variant={getSourceBadgeVariant(event.source)}>
                          {event.source}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>{new Date(event.startDate).toLocaleString('ru-RU')} - {new Date(event.endDate).toLocaleString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="mr-2 h-4 w-4" />
                          <span>{event.publicLocation}</span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>{event.participants} участников</span>
                        </div>
                        <div className="flex items-center">
                          <TagIcon className="mr-2 h-4 w-4" />
                          <span>{event.tags.join(', ')}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Цена:</span>
                          <span>{event.price}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Возраст:</span>
                          <span>{event.ageRestriction}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Сайт:</span>
                          <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{event.website}</a>
                        </div>
                        <div className="flex items-center">
                          <LockIcon className="mr-2 h-4 w-4" />
                          <span className="font-semibold mr-2">Внутренняя локация:</span>
                          <span>{event.internalLocation}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={event.organizer.avatar} />
                            <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-sm font-medium block">{event.organizer.name}</span>
                            <span className="text-xs text-gray-500">{event.organizer.contact}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Обновлено: {new Date(event.updatedAt).toLocaleString('ru-RU')}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Комментарии модераторов:</h4>
                        {event.comments.map((comment, index) => (
                          <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-gray-500">
                              {moderators.find(m => m.id === comment.moderatorId)?.name} - {new Date(comment.createdAt).toLocaleString('ru-RU')}
                            </p>
                          </div>
                        ))}
                      </div>
                      {status === 'на модерации' && (
                        <div className="mt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Label htmlFor={`comment-${event.id}`}>Добавить комментарий:</Label>
                            <Select
                              value={event.assignedModerator?.toString() || ''}
                              onValueChange={(value) => handleAssignModerator(event.id, parseInt(value))}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Назначить модератора" />
                              </SelectTrigger>
                              <SelectContent>
                                {moderators.map((moderator) => (
                                  <SelectItem key={moderator.id} value={moderator.id.toString()}>
                                    {moderator.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Textarea
                            id={`comment-${event.id}`}
                            placeholder="Введите комментарий..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mb-2"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100" onClick={() => handleEditEvent(event)}>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Редактировать
                            </Button>
                            <Button size="sm" variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100" onClick={() => handleApprove(event.id)}>
                              <CheckIcon className="mr-2 h-4 w-4" />
                              Одобрить
                            </Button>
                            <Button size="sm" variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100" onClick={() => handleReject(event.id)}>
                              <XIcon className="mr-2 h-4 w-4" />
                              Отклонить
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Предыдущая
                </Button>
                <span className="mx-4">Страница {currentPage}</span>
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage * eventsPerPage >= filteredEvents.length}
                >
                  Следующая
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать событие</DialogTitle>
          </DialogHeader>
          {currentEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Название
                </Label>
                <Input
                  id="title"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Дата начала
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={currentEvent.startDate}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, startDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Дата окончания
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={currentEvent.endDate}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, endDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publicLocation" className="text-right">
                  Публичная локация
                </Label>
                <Input
                  id="publicLocation"
                  value={currentEvent.publicLocation}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, publicLocation: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internalLocation" className="text-right">
                  Внутренняя локация
                </Label>
                <Input
                  id="internalLocation"
                  value={currentEvent.internalLocation}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, internalLocation: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Тип события
                </Label>
                <Input
                  id="type"
                  value={currentEvent.type}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, type: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="participants" className="text-right">
                  Участники
                </Label>
                <Input
                  id="participants"
                  type="number"
                  value={currentEvent.participants}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, participants: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Теги
                </Label>
                <Input
                  id="tags"
                  value={currentEvent.tags.join(', ')}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, tags: e.target.value.split(', ') })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Цена
                </Label>
                <Input
                  id="price"
                  value={currentEvent.price}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ageRestriction" className="text-right">
                  Возрастное ограничение
                </Label>
                <Input
                  id="ageRestriction"
                  value={currentEvent.ageRestriction}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, ageRestriction: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">
                  Веб-сайт
                </Label>
                <Input
                  id="website"
                  value={currentEvent.website}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, website: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEvent}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}