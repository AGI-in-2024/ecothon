'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, Calendar, MapPin, Users, Clock, TreeDeciduous } from "lucide-react"

export function EcoRibbonPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registrationOpen, setRegistrationOpen] = useState(false)

  const events = [
    {
      id: 1,
      title: "Городская уборка",
      description: "Присоединяйтесь к нам для уборки городского парка и помогите сделать наш город чище!",
      date: "15 мая 2023",
      time: "10:00 - 14:00",
      location: "Центральный парк",
      attendees: 50,
      organizer: "ЭкоГород",
      impact: "Очистка 5 км² территории",
    },
    {
      id: 2,
      title: "Эко-лекция: Переработка отходов",
      description: "Узнайте о важности переработки отходов и как правильно сортировать мусор в домашних условиях.",
      date: "22 мая 2023",
      time: "18:30 - 20:00",
      location: "Городская библиотека",
      attendees: 30,
      organizer: "ЭкоПросвещение",
      impact: "Образование 100+ горожан",
    },
    {
      id: 3,
      title: "Посадка деревьев",
      description: "Помогите нам озеленить наш город, посадив новые деревья в парке 'Зеленая роща'.",
      date: "5 июня 2023",
      time: "09:00 - 13:00",
      location: "Парк 'Зеленая роща'",
      attendees: 100,
      organizer: "Зеленый Город",
      impact: "Посадка 200 новых деревьев",
    },
  ]

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setRegistrationOpen(false)
  }

  const handleRegisterClick = () => {
    setRegistrationOpen(true)
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold flex items-center justify-center">
            <Leaf className="mr-2" />
            Эко лента
          </h1>
          <p className="text-center mt-4 max-w-2xl mx-auto">
            Присоединяйтесь к экологическим мероприятиям в вашем городе. Вместе мы можем сделать наш мир чище и зеленее!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Предстоящие события</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-white border-green-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleEventClick(event)}>
                  <CardHeader>
                    <CardTitle className="text-green-700">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees} участников
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            {selectedEvent ? (
              <Card className="bg-white border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">{selectedEvent.title}</CardTitle>
                  <CardDescription>{selectedEvent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>{selectedEvent.attendees} участников</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Организатор: {selectedEvent.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TreeDeciduous className="w-4 h-4 text-green-600" />
                    <span>Ожидаемый эффект: {selectedEvent.impact}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleRegisterClick}>Зарегистрироваться</Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-green-600 text-lg">Выберите событие для просмотра подробностей</p>
              </div>
            )}

            {registrationOpen && (
              <Card className="mt-8 bg-white border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Регистрация на мероприятие</CardTitle>
                  <CardDescription>Заполните форму для участия в "{selectedEvent.title}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Имя</label>
                      <Input id="name" placeholder="Введите ваше имя" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <Input id="email" type="email" placeholder="Введите ваш email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон</label>
                      <Input id="phone" type="tel" placeholder="Введите ваш номер телефона" />
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Комментарий</label>
                      <Textarea id="comment" placeholder="Оставьте комментарий или вопрос" />
                    </div>
                    <Button type="submit" className="w-full">Отправить заявку</Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Эко лента. Все права защищены.</p>
          <p className="mt-2">Вместе мы делаем мир лучше!</p>
        </div>
      </footer>
    </div>
  )
}