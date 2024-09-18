'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckIcon, XIcon, CalendarIcon, MapPinIcon, UserIcon, TagIcon, ClockIcon, SearchIcon, FilterIcon, EditIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type EventStatus = 'на модерации' | 'одобрено' | 'отклонено'
type EventSource = 'частная инициатива' | 'организаторы' | 'парсер'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  type: string
  participants: number
  tags: string[]
  price: number
  ageRestriction: string
  website: string
  status: EventStatus
  source: EventSource
  assignedModerator?: number
}

interface Moderator {
  id: number
  name: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Фестиваль уличной еды",
    description: "Большой фестиваль уличной еды с участием лучших шеф-поваров города",
    date: "2023-07-15",
    location: "Центральный парк",
    type: "Фестиваль",
    participants: 1000,
    tags: ["еда", "развлечения"],
    price: 0,
    ageRestriction: "0+",
    website: "https://streetfoodfest.com",
    status: "на модерации",
    source: "организаторы"
  },
  {
    id: 2,
    title: "Выставка современного искусства",
    description: "Ежегодная выставка работ молодых художников",
    date: "2023-08-01",
    location: "Городская галерея",
    type: "Выставка",
    participants: 500,
    tags: ["искусство", "культура"],
    price: 300,
    ageRestriction: "12+",
    website: "https://artexhibition.com",
    status: "одобрено",
    source: "частная инициатива"
  },
  {
    id: 3,
    title: "Марафон здоровья",
    description: "Городской марафон для поддержки здорового образа жизни",
    date: "2023-09-10",
    location: "Набережная",
    type: "Спорт",
    participants: 2000,
    tags: ["спорт", "здоровье"],
    price: 500,
    ageRestriction: "18+",
    website: "https://healthmarathon.com",
    status: "отклонено",
    source: "парсер"
  }
]

const moderators: Moderator[] = [
  { id: 1, name: "Иван Петров" },
  { id: 2, name: "Анна Сидорова" },
  { id: 3, name: "Алексей Иванов" }
]

export function ImprovedSeaGreenAdminPanel() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [sourceFilter, setSourceFilter] = useState<EventSource | 'all'>('all')
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [comment, setComment] = useState('')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)

  const eventsPerPage = 10

  useEffect(() => {
    const filtered = mockEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (sourceFilter === 'all' || event.source === sourceFilter) &&
      (dateRange.from === '' || new Date(event.date) >= new Date(dateRange.from)) &&
      (dateRange.to === '' || new Date(event.date) <= new Date(dateRange.to))
    )
    setFilteredEvents(filtered)
  }, [searchTerm, dateRange, sourceFilter])

  const handleBulkApprove = () => {
    // Implement bulk approve logic
    console.log("Bulk approve", selectedEvents)
  }

  const handleBulkReject = () => {
    // Implement bulk reject logic
    console.log("Bulk reject", selectedEvents)
  }

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditModalOpen(true)
  }

  const handleApprove = (eventId: number) => {
    // Implement approve logic
    console.log("Approve event", eventId)
  }

  const handleReject = (eventId: number) => {
    // Implement reject logic
    console.log("Reject event", eventId)
  }

  const handleAssignModerator = (eventId: number, moderatorId: number) => {
    // Implement assign moderator logic
    console.log("Assign moderator", eventId, moderatorId)
  }

  const handleSaveEvent = () => {
    // Implement save event logic
    console.log("Save event", currentEvent)
    setIsEditModalOpen(false)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 shadow-lg">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Event Dashboard</h1>
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 flex flex-wrap gap-4">
            <Input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-40 bg-white border-emerald-300 focus:ring-emerald-500"
            />
            <Input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-40 bg-white border-emerald-300 focus:ring-emerald-500"
            />
            <Select value={sourceFilter} onValueChange={(value: EventSource | 'all') => setSourceFilter(value)}>
              <SelectTrigger className="w-[180px] bg-white border-emerald-300 focus:ring-emerald-500">
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
          <div className="flex gap-2">
            <Button 
              onClick={handleBulkApprove} 
              disabled={selectedEvents.length === 0} 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Одобрить выбранные
            </Button>
            <Button 
              onClick={handleBulkReject} 
              disabled={selectedEvents.length === 0} 
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Отклонить выбранные
            </Button>
          </div>
        </div>

        <Tabs defaultValue="на модерации" className="bg-white rounded-lg shadow">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="на модерации" 
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-yellow-800"
            >
              На модерации
            </TabsTrigger>
            <TabsTrigger 
              value="одобрено" 
              className="data-[state=active]:bg-green-200 data-[state=active]:text-green-800"
            >
              Одобренные
            </TabsTrigger>
            <TabsTrigger 
              value="отклонено" 
              className="data-[state=active]:bg-red-200 data-[state=active]:text-red-800"
            >
              Отклоненные
            </TabsTrigger>
          </TabsList>
          {['на модерации', 'одобрено', 'отклонено'].map((status) => (
            <TabsContent key={status} value={status}>
              <ScrollArea className="h-[600px] w-full rounded-md border border-emerald-200 p-4">
                {filteredEvents
                  .filter(event => event.status === status)
                  .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                  .map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      selectedEvents={selectedEvents}
                      setSelectedEvents={setSelectedEvents}
                      handleEditEvent={handleEditEvent}
                      handleApprove={handleApprove}
                      handleReject={handleReject}
                      comment={comment}
                      setComment={setComment}
                      handleAssignModerator={handleAssignModerator}
                      moderators={moderators}
                      status={status as EventStatus}
                    />
                  ))}
              </ScrollArea>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalEvents={filteredEvents.filter(event => event.status === status).length}
                eventsPerPage={eventsPerPage}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <EditEventDialog
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        handleSaveEvent={handleSaveEvent}
      />
    </Card>
  )
}

function EventCard({ event, selectedEvents, setSelectedEvents, handleEditEvent, handleApprove, handleReject, comment, setComment, handleAssignModerator, moderators, status }: {
  event: Event
  selectedEvents: number[]
  setSelectedEvents: React.Dispatch<React.SetStateAction<number[]>>
  handleEditEvent: (event: Event) => void
  handleApprove: (eventId: number) => void
  handleReject: (eventId: number) => void
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  handleAssignModerator: (eventId: number, moderatorId: number) => void
  moderators: Moderator[]
  status: EventStatus
}) {
  return (
    <Card key={event.id} className="mb-4 bg-white border-emerald-200">
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
          <Badge variant={event.source === 'частная инициатива' ? 'secondary' : event.source === 'организаторы' ? 'default' : 'outline'}>
            {event.source}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-emerald-600" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-emerald-600" />
            {event.location}
          </div>
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2 text-emerald-600" />
            {event.participants} участников
          </div>
          <div className="flex items-center">
            <TagIcon className="w-4 h-4 mr-2 text-emerald-600" />
            {event.tags.join(', ')}
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-emerald-600" />
            {event.ageRestriction}
          </div>
        </div>
        {status === 'на модерации' && (
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Label htmlFor={`comment-${event.id}`}>Добавить комментарий:</Label>
              <Select
                value={event.assignedModerator?.toString() || ''}
                onValueChange={(value) => handleAssignModerator(event.id, parseInt(value))}
              >
                <SelectTrigger className="w-[200px] border-emerald-300 focus:ring-emerald-500">
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
              className="mb-2 border-emerald-300 focus:ring-emerald-500"
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="outline" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100" onClick={() => handleEditEvent(event)}>
                <EditIcon className="mr-2 h-4 w-4" />
                Редактировать
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleApprove(event.id)}>
                <CheckIcon className="mr-2 h-4 w-4" />
                Одобрить
              </Button>
              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleReject(event.id)}>
                <XIcon className="mr-2 h-4 w-4" />
                Отклонить
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Pagination({ currentPage, setCurrentPage, totalEvents, eventsPerPage }: {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalEvents: number
  eventsPerPage: number
}) {
  return (
    <div className="mt-4 flex justify-center">
      <Button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        Предыдущая
      </Button>
      <span className="mx-4 text-emerald-800">Страница {currentPage}</span>
      <Button
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage * eventsPerPage >= totalEvents}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        Следующая
      </Button>
    </div>
  )
}

function EditEventDialog({ isOpen, setIsOpen, currentEvent, setCurrentEvent, handleSaveEvent }: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentEvent: Event | null
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event | null>>
  handleSaveEvent: () => void
}) {
  if (!currentEvent) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-emerald-50">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Редактировать событие</DialogTitle>
        </DialogHeader>
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
          {/* Add more fields as needed */}
        </div>
        <DialogFooter>
          <Button onClick={handleSaveEvent} className="bg-emerald-600 hover:bg-emerald-700">Сохранить изменения</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}