'use client'

import { useState, useEffect, useMemo } from 'react'
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
import { toast } from "@/components/ui/use-toast"

// ... (types remain the same)

const moderators: Moderator[] = [
  { id: 1, name: "Анна Модератова", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Иван Проверкин", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Елена Контролева", avatar: "/placeholder.svg?height=40&width=40" },
]

export function ImprovedAdminPanelComponent() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [comment, setComment] = useState('')
  const [sourceFilter, setSourceFilter] = useState<EventSource | 'all'>('all')
  const [activeTab, setActiveTab] = useState<EventStatus>('на модерации')
  const eventsPerPage = 5

  useEffect(() => {
    // Simulating API call to fetch events
    const fetchEvents = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить события. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        })
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDateRange = (!dateRange.from || new Date(event.startDate) >= new Date(dateRange.from)) &&
        (!dateRange.to || new Date(event.endDate) <= new Date(dateRange.to))
      
      const matchesSource = sourceFilter === 'all' || event.source === sourceFilter
      
      return matchesSearch && matchesDateRange && matchesSource && event.status === activeTab
    })
  }, [events, searchTerm, dateRange, sourceFilter, activeTab])

  const handleApprove = async (id: number) => {
    try {
      // Replace with actual API call
      await fetch(`/api/events/${id}/approve`, { method: 'POST', body: JSON.stringify({ comment }) })
      setEvents(events.map(event => 
        event.id === id ? { ...event, status: 'одобрено', updatedAt: new Date().toISOString(), comments: [...event.comments, { id: Date.now(), moderatorId: 1, text: comment, createdAt: new Date().toISOString() }] } : event
      ))
      setComment('')
      toast({
        title: "Успешно",
        description: "Событие одобрено.",
      })
    } catch (error) {
      console.error('Failed to approve event:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить событие. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      // Replace with actual API call
      await fetch(`/api/events/${id}/reject`, { method: 'POST', body: JSON.stringify({ comment }) })
      setEvents(events.map(event => 
        event.id === id ? { ...event, status: 'отклонено', updatedAt: new Date().toISOString(), comments: [...event.comments, { id: Date.now(), moderatorId: 1, text: comment, createdAt: new Date().toISOString() }] } : event
      ))
      setComment('')
      toast({
        title: "Успешно",
        description: "Событие отклонено.",
      })
    } catch (error) {
      console.error('Failed to reject event:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить событие. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const handleBulkApprove = async () => {
    try {
      // Replace with actual API call
      await fetch('/api/events/bulk-approve', { method: 'POST', body: JSON.stringify({ ids: selectedEvents }) })
      setEvents(events.map(event => 
        selectedEvents.includes(event.id) ? { ...event, status: 'одобрено', updatedAt: new Date().toISOString() } : event
      ))
      setSelectedEvents([])
      toast({
        title: "Успешно",
        description: "Выбранные события одобрены.",
      })
    } catch (error) {
      console.error('Failed to bulk approve events:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить выбранные события. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const handleBulkReject = async () => {
    try {
      // Replace with actual API call
      await fetch('/api/events/bulk-reject', { method: 'POST', body: JSON.stringify({ ids: selectedEvents }) })
      setEvents(events.map(event => 
        selectedEvents.includes(event.id) ? { ...event, status: 'отклонено', updatedAt: new Date().toISOString() } : event
      ))
      setSelectedEvents([])
      toast({
        title: "Успешно",
        description: "Выбранные события отклонены.",
      })
    } catch (error) {
      console.error('Failed to bulk reject events:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить выбранные события. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSaveEvent = async () => {
    if (currentEvent) {
      try {
        // Replace with actual API call
        await fetch(`/api/events/${currentEvent.id}`, { method: 'PUT', body: JSON.stringify(currentEvent) })
        setEvents(events.map(event => 
          event.id === currentEvent.id ? currentEvent : event
        ))
        setIsEditModalOpen(false)
        toast({
          title: "Успешно",
          description: "Событие обновлено.",
        })
      } catch (error) {
        console.error('Failed to update event:', error)
        toast({
          title: "Ошибка",
          description: "Не удалось обновить событие. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAssignModerator = async (eventId: number, moderatorId: number) => {
    try {
      // Replace with actual API call
      await fetch(`/api/events/${eventId}/assign-moderator`, { method: 'POST', body: JSON.stringify({ moderatorId }) })
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, assignedModerator: moderatorId } : event
      ))
      toast({
        title: "Успешно",
        description: "Модератор назначен.",
      })
    } catch (error) {
      console.error('Failed to assign moderator:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось назначить модератора. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const getSourceBadgeVariant = (source: EventSource) => {
    switch (source) {
      case 'организаторы': return 'default'
      case 'частная инициатива': return 'secondary'
      case 'парсер': return 'outline'
    }
  }

  const getEventStatistics = useMemo(() => {
    const total = events.length
    const pending = events.filter(e => e.status === 'на модерации').length
    const approved = events.filter(e => e.status === 'одобрено').length
    const rejected = events.filter(e => e.status === 'отклонено').length

    return { total, pending, approved, rejected }
  }, [events])

  return (
    <Card className="w-full max-w-6xl mx-auto bg-background shadow-lg">
      <CardContent className="p-6">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <Input
                placeholder="Поиск событий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
                icon={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
              />
              <div className="flex space-x-2">
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full md:w-40"
                />
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full md:w-40"
                />
              </div>
              <Select value={sourceFilter} onValueChange={(value: EventSource | 'all') => setSourceFilter(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
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
            <div className="flex space-x-2 w-full md:w-auto">
              <Button onClick={handleBulkApprove} disabled={selectedEvents.length === 0} className="w-full md:w-auto">
                Одобрить выбранные
              </Button>
              <Button onClick={handleBulkReject} disabled={selectedEvents.length === 0} className="w-full md:w-auto">
                Отклонить выбранные
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Всего событий</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{getEventStatistics.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">На модерации</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{getEventStatistics.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Одобрено</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{getEventStatistics.approved}</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{getEventStatistics.rejected}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={(value: EventStatus) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="на модерации" className="text-sm md:text-base">На модерации</TabsTrigger>
            <TabsTrigger value="од��брено" className="text-sm md:text-base">Одобренные</TabsTrigger>
            <TabsTrigger value="отклонено" className="text-sm md:text-base">Отклоненные</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[600px] w-full rounded-md border border-border p-4">
              {filteredEvents
                .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                .map(event => (
                <Card key={event.id} className="mb-4 bg-card">
                  <CardHeader className="pb-2">
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
                        <CardTitle className="text-lg font-semibold text-primary">{event.title}</CardTitle>
                      </div>
                      <Badge variant={getSourceBadgeVariant(event.source)} className="text-xs">
                        {event.source}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{new Date(event.startDate).toLocaleString('ru-RU')} - {new Date(event.endDate).toLocaleString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{event.publicLocation}</span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{event.participants} участников</span>
                      </div>
                      <div className="flex items-center">
                        <TagIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{event.tags.join(', ')}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <span className="font-semibold mr-2 text-primary">Цена:</span>
                        <span>{event.price}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2 text-primary">Возраст:</span>
                        <span>{event.ageRestriction}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2 text-primary">Сайт:</span>
                        <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{event.website}</a>
                      </div>
                      <div className="flex items-center">
                        <LockIcon className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-semibold mr-2 text-primary">Внутренняя локация:</span>
                        <span>{event.internalLocation}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4 bg-muted p-2 rounded-md">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={event.organizer.avatar} />
                          <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium block text-primary">{event.organizer.name}</span>
                          <span className="text-xs text-muted-foreground">{event.organizer.contact}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        <span>Обновлено: {new Date(event.updatedAt).toLocaleString('ru-RU')}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2 text-primary">Комментарии модераторов:</h4>
                      {event.comments.map((comment, index) => (
                        <div key={index} className="bg-muted p-2 rounded-md mb-2">
                          <p className="text-sm text-primary">{comment.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {moderators.find(m => m.id === comment.moderatorId)?.name} - {new Date(comment.createdAt).toLocaleString('ru-RU')}
                          </p>
                        </div>
                      ))}
                    </div>
                    {activeTab === 'на модерации' && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`comment-${event.id}`} className="text-primary">Добавить комментарий:</Label>
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
            <div className="mt-4 flex justify-center items-center space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                size="sm"
              >
                Предыдущая
              </Button>
              <span className="text-sm text-muted-foreground">Страница {currentPage}</span>
              <Button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage * eventsPerPage >= filteredEvents.length}
                size="sm"
              >
                Следующая
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
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