'use client'

import { useState } from 'react'
import config from '../config'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed'
type EventSource = 'internal' | 'external'

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
  tags: string[]
  createdAt: string
  updatedAt: string
  price?: string
  ageRestriction?: string
  website?: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Городская уборка парка",
    startDate: "2023-06-15T09:00:00",
    endDate: "2023-06-15T13:00:00",
    publicLocation: "Центральный парк",
    internalLocation: "Вход со стороны ул. Ленина",
    type: "cleanup",
    description: "Приглашаем всех на уборку Центрального парка. Вместе мы сделаем наш город чище!",
    status: "published",
    source: "internal",
    tags: ["уборка", "экология", "волонтерство"],
    createdAt: "2023-05-20T10:00:00",
    updatedAt: "2023-05-20T10:00:00",
    price: "Бесплатно",
    ageRestriction: "6+",
    website: "https://cleancity.org/park-cleanup"
  },
  {
    id: 2,
    title: "Лекция о раздельном сборе мусора",
    startDate: "2023-06-20T18:00:00",
    endDate: "2023-06-20T20:00:00",
    publicLocation: "Городская библиотека",
    internalLocation: "Конференц-зал, 2 этаж",
    type: "lecture",
    description: "Узнайте, как правильно сортировать мусор и почему это важно для окружающей среды.",
    status: "published",
    source: "internal",
    tags: ["экология", "образование", "переработка"],
    createdAt: "2023-05-25T14:30:00",
    updatedAt: "2023-05-25T14:30:00",
    price: "200 руб.",
    ageRestriction: "12+",
    website: "https://ecolearn.com/waste-sorting"
  },
  {
    id: 3,
    title: "Мастер-класс по созданию эко-сумок",
    startDate: "2023-07-05T15:00:00",
    endDate: "2023-07-05T17:00:00",
    publicLocation: "Творческая мастерская 'Зеленый дом'",
    internalLocation: "Основной зал",
    type: "workshop",
    description: "Научитесь создавать стильные и экологичные сумки своими руками!",
    status: "draft",
    source: "internal",
    tags: ["мастер-класс", "экология", "рукоделие"],
    createdAt: "2023-06-01T09:15:00",
    updatedAt: "2023-06-01T09:15:00",
    price: "500 руб.",
    ageRestriction: "14+",
    website: "https://greencraft.ru/eco-bags"
  },
  {
    id: 4,
    title: "Велопробег 'Зеленый маршрут'",
    startDate: "2023-07-10T10:00:00",
    endDate: "2023-07-10T14:00:00",
    publicLocation: "Площадь Свободы",
    internalLocation: "Старт у фонтана",
    type: "outdoor",
    description: "Присоединяйтесь к нашему эко-велопробегу по живописным местам города!",
    status: "published",
    source: "external",
    tags: ["велосипед", "спорт", "экология"],
    createdAt: "2023-06-05T11:00:00",
    updatedAt: "2023-06-05T11:00:00",
    price: "Бесплатно",
    ageRestriction: "16+",
    website: "https://bikeclub.org/green-route"
  },
  {
    id: 5,
    title: "Выставка 'Искусство переработки'",
    startDate: "2023-08-01T10:00:00",
    endDate: "2023-08-14T19:00:00",
    publicLocation: "Городской выставочный центр",
    internalLocation: "Залы 2 и 3",
    type: "exhibition",
    description: "Уникальная выставка произведений искусства, созданных из переработанных материалов.",
    status: "draft",
    source: "internal",
    tags: ["искусство", "переработка", "выставка"],
    createdAt: "2023-06-10T16:45:00",
    updatedAt: "2023-06-10T16:45:00",
    price: "300 руб.",
    ageRestriction: "0+",
    website: "https://artrecycle.com/exhibition"
  }
]

export function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    startDate: '',
    endDate: '',
    publicLocation: '',
    internalLocation: '',
    type: '',
    description: '',
    status: 'draft',
    source: 'internal',
    tags: [],
    price: '',
    ageRestriction: '',
    website: ''
  })

  const handleCreateEvent = async () => {
    const { id, ...eventData } = newEvent; // Удаляем id
    const createdEvent: any = {
      id: events.length + 1,
      ...eventData, // Используем eventData вместо newEvent
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setEvents([...events, createdEvent])

    try {
      const eventBody = createdEvent
      eventBody.start_date = eventBody.startDate
      eventBody.end_date = eventBody.endDate
      eventBody.public_location = eventBody.publicLocation
      eventBody.event_type = eventBody.type
      eventBody.age_restriction = eventBody.ageRestriction

      const response = await fetch(`${config.Host_url}/events/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventBody),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании мероприятия');
      }

      const data = await response.json();
      setIsCreateEventDialogOpen(false);
      setNewEvent({});
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setNewEvent(prev => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setNewEvent(prev => ({ ...prev, tags }))
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-teal-50 to-emerald-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-emerald-800 text-center">Личный кабинет организатора</h1>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="mb-6 bg-emerald-100 p-1 rounded-lg">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Панель управления</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Мои мероприятия</TabsTrigger>
          <TabsTrigger value="statistics" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Статистика</TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Профиль</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                <CardTitle>Предстоящие мероприятия</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-[300px]">
                  {events.filter(event => event.status === 'published').map(event => (
                    <div key={event.id} className="flex justify-between items-center mb-4 p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium text-emerald-800">{event.title}</span>
                      <Badge className="bg-emerald-200 text-emerald-800">{new Date(event.startDate).toLocaleDateString()}</Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                <CardTitle>Календарь</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-emerald-200"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle>Мои мероприятия</CardTitle>
                <Dialog open={isCreateEventDialogOpen} onOpenChange={setIsCreateEventDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-emerald-600 hover:bg-emerald-100"><PlusIcon className="mr-2 h-4 w-4" /> Создать мероприятие</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-emerald-800">Создать новое мероприятие</DialogTitle>
                      <DialogDescription className="text-emerald-600">
                        Заполните информацию о вашем новом экологическом мероприятии.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Название</Label>
                          <Input
                            id="title"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Тип мероприятия</Label>
                          <Select onValueChange={handleSelectChange('type')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="workshop">Мастер-класс</SelectItem>
                              <SelectItem value="lecture">Лекция</SelectItem>
                              <SelectItem value="cleanup">Уборка территории</SelectItem>
                              <SelectItem value="exhibition">Выставка</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Дата начала</Label>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="datetime-local"
                            value={newEvent.startDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Дата окончания</Label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="datetime-local"
                            value={newEvent.endDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="publicLocation">Публичное место проведения</Label>
                          <Input
                            id="publicLocation"
                            name="publicLocation"
                            value={newEvent.publicLocation}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="internalLocation">Внутреннее место проведения</Label>
                          <Input
                            id="internalLocation"
                            name="internalLocation"
                            value={newEvent.internalLocation}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={newEvent.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Статус</Label>
                          <Select onValueChange={handleSelectChange('status')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Черновик</SelectItem>
                              <SelectItem value="published">Опубликовано</SelectItem>
                              <SelectItem value="cancelled">Отменено</SelectItem>
                              <SelectItem value="completed">Завершено</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="source">Источник</Label>
                          <Select onValueChange={handleSelectChange('source')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите источник" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="internal">Внутренний</SelectItem>
                              <SelectItem value="external">Внешний</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Теги (через запятую)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={newEvent.tags?.join(', ')}
                          onChange={handleTagsChange}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Цена</Label>
                          <Input
                            id="price"
                            name="price"
                            value={newEvent.price}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ageRestriction">Возрастное ограничение</Label>
                          <Input
                            id="ageRestriction"
                            name="ageRestriction"
                            value={newEvent.ageRestriction}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Веб-сайт</Label>
                          <Input
                            id="website"
                            name="website"
                            value={newEvent.website}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateEvent} className="bg-emerald-600 hover:bg-emerald-700 text-white">Создать мероприятие</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-100">
                    <TableHead className="text-emerald-800">Название</TableHead>
                    <TableHead className="text-emerald-800">Дата начала</TableHead>
                    <TableHead className="text-emerald-800">Статус</TableHead>
                    <TableHead className="text-emerald-800">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map(event => (
                    <TableRow key={event.id} className="hover:bg-emerald-50">
                      <TableCell className="font-medium text-emerald-800">{event.title}</TableCell>
                      <TableCell>{new Date(event.startDate).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'} className="bg-emerald-200 text-emerald-800">
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-emerald-600 hover:bg-emerald-100"><EyeIcon className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm" className="text-emerald-600 hover:bg-emerald-100"><EditIcon className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm" className="text-emerald-600 hover:bg-emerald-100"><TrashIcon className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
              <CardTitle>Статистика мероприятий</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-emerald-50 border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Всего мероприятий</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-emerald-600">{events.length}</p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Опубликовано</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-emerald-600">
                      {events.filter(event => event.status === 'published').length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Завершено</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-emerald-600">
                      {events.filter(event => event.status === 'completed').length}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
              <CardTitle>Профиль организатора</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-emerald-800">Здесь будет размещена информация о профиле организатора и настройки аккаунта.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}